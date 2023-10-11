
interface PreSearchWordStore{
    preSearchWord : string | undefined;
    setPreSearhWord : (preSearchWord : string ) => void;
    resetPreSearhWord : () => void;
}