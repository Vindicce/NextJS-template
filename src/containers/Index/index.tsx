import { IIndex } from '~/containers/Index/data';
import { Index as Layout } from './Layout';

export default function Index(props: IIndex) {
  return <Layout {...props} />;
}
