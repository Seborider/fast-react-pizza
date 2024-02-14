import ButtonLink from "../../ui-components/ButtonLink.tsx";

function EmptyCart() {
  return (
    <div className="px-4 py-3">
      <ButtonLink to="/menu">&larr; Back to menu</ButtonLink>

      <p className="mt-7 font-semibold">
        Your cart is still empty. Start adding some pizzas :)
      </p>
    </div>
  );
}

export default EmptyCart;
