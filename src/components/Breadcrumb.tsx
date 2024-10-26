import { Fragment, ReactNode  } from 'react';
import Divider from '@mui/material/Divider';

type BreadcrumbProps = {
  children: Array<ReactNode>;
};

export default function Breadcrumb(props: BreadcrumbProps) {
  const { children } = props;

  const divider = <Divider orientation="vertical" variant="middle" flexItem />;

  return children ? (
    children.filter(Boolean).map((crumb, index) => (
      <Fragment key={index}>
        { Boolean(index) && divider }
        { crumb }
      </Fragment>
    ))
  ) : null;
}
