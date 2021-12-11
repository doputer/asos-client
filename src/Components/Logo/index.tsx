export const Logo = ({
  width,
  theme = 'white',
}: {
  width: number | string;
  theme?: string;
}) => {
  return (
    <>
      {theme === 'white' && (
        <img src="/Assets/Images/Logo-White.svg" alt="" width={width} />
      )}
      {theme === 'cloud' && (
        <img src="/Assets/Images/Logo-Cloud.svg" alt="" width={width} />
      )}
    </>
  );
};
