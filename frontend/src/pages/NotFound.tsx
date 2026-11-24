import { NotFoundBlock } from '../components/Status';
import { useTitle } from '../hooks/useData';

export default function NotFound() {
  useTitle('Not found');
  return <NotFoundBlock />;
}
