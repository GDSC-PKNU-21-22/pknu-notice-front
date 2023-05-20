import { To, useNavigate } from 'react-router-dom';

const useRoter = () => {
  const router = useNavigate();

  return {
    currentPath: window.location.pathname,
    routerTo: (path: To) => router(path),
    goBack: () => router(-1 as number),
  };
};

export default useRoter;

/*
export declare type To = string | Partial<Path>;

export interface Path {
    
    /* A URL pathname, beginning with a /.
     
    pathname: string;
    
     * A URL search string, beginning with a ?.
    
    search: string;
    
     * A URL fragment identifier, beginning with a #.
     
    hash: string;
}
*/
