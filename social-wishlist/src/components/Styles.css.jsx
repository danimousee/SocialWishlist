import { styled } from '@mui/system';

export const H2 = styled('h2')(({ theme }) => ({
    margin: 0,
    color: theme.palette.primary.main,
  }));

export const Container = styled("div")(({
  padding: "1rem",
  justifyContent: "center",
}))
