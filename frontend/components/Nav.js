import Link from "next/link";
import { Mutation } from "react-apollo";
import { TOGGLE_CART_MUTATION } from "./Cart";
import NavStyles from "./styles/NavStyles";
import User from "./User";
import Signout from "./Signout";
import CartCount from "./CartCount";

const Nav = () => (
  <User>
    {({ data: { me } }) => (
      <NavStyles>
        <Link href="/items">
          <a>shop</a>
        </Link>
        {me && (
          <>
            <Link href="/sell">
              <a>sell</a>
            </Link>
            <Link href="/orders">
              <a>orders</a>
            </Link>
            <Link href="/me">
              <a>account</a>
            </Link>
            <Signout />
            <Mutation mutation={TOGGLE_CART_MUTATION}>
              {toggleCart => (
                <button onClick={toggleCart}>
                  CART
                  <CartCount
                    count={me.cart.reduce(
                      (tally, cartItem) => tally + cartItem.quantity,
                      0
                    )}
                  ></CartCount>
                </button>
              )}
            </Mutation>
          </>
        )}

        {!me && (
          <Link href="/signup">
            <a>sign In</a>
          </Link>
        )}
      </NavStyles>
    )}
  </User>
);

export default Nav;
