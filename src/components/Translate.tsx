import { useTranslation } from 'react-i18next';
import type { TOptions } from 'i18next';

type TranslateProps = {
  text: string;
  options?: TOptions;
};

function Translate(props: TranslateProps) {
  const { text, options = {} } = props;

  const { t } = useTranslation();
  return <>{t(text, options)}</>;
}

export default Translate;
