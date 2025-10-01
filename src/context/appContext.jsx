import { createContext, useContext, useEffect, useRef, useState } from "react";
import supabase from "../supabaseClient";

const AppContext = createContext({});

const AppContextProvider = ({ children }) => {
  let myChannel = null;
  const [username, setUsername] = useState("");
  const [session, setSession] = useState(null);
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState("");
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [routeHash, setRouteHash] = useState("");
  const [isOnBottom, setIsOnBottom] = useState(false);
  const [newIncomingMessageTrigger, setNewIncomingMessageTrigger] =
    useState(null);
  const [unviewedMessageCount, setUnviewedMessageCount] = useState(0);
  const [countryCode, setCountryCode] = useState("");
  const [isInitialLoad, setIsInitialLoad] = useState(false);

  const scrollRef = useRef();

  const randomUsername = () => `@user${Date.now().toString().slice(-4)}`;

  const initializeUser = (session) => {
    setSession(session);
    let uname = session?.user.user_metadata.user_name;
    if (!uname) {
      uname = localStorage.getItem("username") || randomUsername();
    }
    setUsername(uname);
    localStorage.setItem("username", uname);
  };

  const getLocation = async () => {
    try {
      const res = await fetch("https://api.db-ip.com/v2/free/self");
      const { countryCode } = await res.json();
      setCountryCode(countryCode);
      localStorage.setItem("countryCode", countryCode);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const init = async () => {
      // Handle OAuth redirect
      if (window.location.hash.includes("access_token")) {
        const { data: { session }, error } =
          await supabase.auth.getSessionFromUrl();
        if (error) console.error("OAuth error:", error.message);
        if (session) {
          initializeUser(session);
          window.history.replaceState({}, document.title, "/");
        }
      } else {
        const { data: { session } } = await supabase.auth.getSession();
        initializeUser(session);
      }

      getMessagesAndSubscribe();

      const storedCountryCode = localStorage.getItem("countryCode");
      if (storedCountryCode && storedCountryCode !== "undefined") {
        setCountryCode(storedCountryCode);
      } else {
        getLocation();
      }

      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        (_event, session) => initializeUser(session)
      );

      return () => {
        if (myChannel) supabase.removeChannel(myChannel);
        subscription.unsubscribe();
      };
    };

    init();
  }, []);

  useEffect(() => {
    if (isInitialLoad) {
      setIsInitialLoad(false);
      scrollToBottom();
    }
  }, [messages]);

  useEffect(() => {
    if (!newIncomingMessageTrigger) return;
    if (newIncomingMessageTrigger.username === username) scrollToBottom();
    else setUnviewedMessageCount((c) => c + 1);
  }, [newIncomingMessageTrigger]);

  const handleNewMessage = (payload) => {
    setMessages((prev) => [payload.new, ...prev]);
    setNewIncomingMessageTrigger(payload.new);
  };

  const getInitialMessages = async () => {
    if (messages.length) return;
    const { data, error } = await supabase
      .from("messages")
      .select()
      .range(0, 49)
      .order("id", { ascending: false });
    setLoadingInitial(false);
    if (error) setError(error.message);
    else {
      setIsInitialLoad(true);
      setMessages(data);
    }
  };

  const getMessagesAndSubscribe = async () => {
    setError("");
    await getInitialMessages();
    if (!myChannel) {
      myChannel = supabase
        .channel("custom-all-channel")
        .on(
          "postgres_changes",
          { event: "*", schema: "public", table: "messages" },
          handleNewMessage
        )
        .subscribe();
    }
  };

  const onScroll = async ({ target }) => {
    if (target.scrollHeight - target.scrollTop <= target.clientHeight + 1) {
      setUnviewedMessageCount(0);
      setIsOnBottom(true);
    } else setIsOnBottom(false);

    if (target.scrollTop === 0) {
      const { data, error } = await supabase
        .from("messages")
        .select()
        .range(messages.length, messages.length + 49)
        .order("id", { ascending: false });
      if (error) setError(error.message);
      else {
        target.scrollTop = 1;
        setMessages((prev) => [...prev, ...data]);
      }
    }
  };

  const scrollToBottom = () => {
    if (scrollRef.current)
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  };

  return (
    <AppContext.Provider
      value={{
        messages,
        loadingInitial,
        error,
        getMessagesAndSubscribe,
        username,
        setUsername,
        randomUsername,
        routeHash,
        scrollRef,
        onScroll,
        scrollToBottom,
        isOnBottom,
        country: countryCode,
        unviewedMessageCount,
        session,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => useContext(AppContext);

export { AppContextProvider, useAppContext, AppContext as default };

