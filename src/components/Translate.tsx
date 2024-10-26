import { useTranslation } from 'react-i18next';

type Props = {
  text: string;
  options?: {
    [key: string]: string;
  };
};

function Translate({ text, options = {} }: Props) {
  const { t } = useTranslation();
  return <>{t(text, options)}</>;
}

export default Translate;
