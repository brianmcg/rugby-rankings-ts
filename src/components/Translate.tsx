import { useTranslation } from 'react-i18next';
import type { TOptions } from 'i18next';

type Props = {
  text: string;
  options?: TOptions;
};

function Translate({ text, options = {} }: Props) {
  const { t } = useTranslation();
  return t(text, options);
}

export default Translate;
