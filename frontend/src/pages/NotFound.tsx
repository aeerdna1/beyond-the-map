import { NotFoundBlock } from '../components/Status';
import { useTitle } from '../hooks/useData';
import { useT } from '../i18n';

export default function NotFound() {
  const t = useT();
  useTitle(t.meta.notFound);
  return <NotFoundBlock />;
}
