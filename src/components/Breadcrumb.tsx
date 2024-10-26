import { Fragment, ReactNode } from 'react';
import Divider from '@mui/material/Divider';

type Props = {
  children: ReactNode;
};

export default function Breadcrumb({ children }: Props) {
  const divider = <Divider orientation="vertical" variant="middle" flexItem />;

  if (children instanceof Array) {
    return children.filter(Boolean).map((crumb: ReactNode, index: number) => (
      <Fragment key={index}>
        {Boolean(index) && divider}
        {crumb}
      </Fragment>
    ));
  }

  return null;
}
