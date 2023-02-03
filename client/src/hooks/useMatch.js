import { useRouteMatch } from 'react-router-dom';

export function useMatchURL() {
  const match = useRouteMatch();
  const url = match.url;

  if (!url.endsWith('/')) {
    return url;
  } else {
    return url.slice(0, url.length - 1);
  }
}
