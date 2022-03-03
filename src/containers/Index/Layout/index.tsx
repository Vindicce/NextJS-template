import { Text } from "~/components";

import { IIndexLayout } from "~/containers/Index/data";
import S from "./styles";

export const Index = ({ data }: IIndexLayout) => (
  <S.Header justifyContent="center">
    <Text variant="h1">{`Bem Vindo ao template vindicce`}</Text>
  </S.Header>
);
