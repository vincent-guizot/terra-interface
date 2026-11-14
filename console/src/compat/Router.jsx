import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';

export function useRouter() {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();
  const [searchParams] = useSearchParams();

  const query = {
    ...params,
    ...Object.fromEntries(searchParams.entries()),
  };

  return {
    pathname: location.pathname,
    asPath: `${location.pathname}${location.search}`,
    query,
    push: (path) => navigate(path),
    replace: (path) => navigate(path, { replace: true }),
    back: () => navigate(-1),
  };
}

export default { useRouter };
