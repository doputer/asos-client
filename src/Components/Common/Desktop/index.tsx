import { useMediaQuery } from 'react-responsive';

export const Desktop = ({ children }: { children: any }) => {
  const isDesktop = useMediaQuery({ minWidth: 992 });

  return isDesktop ? children : null;
};
