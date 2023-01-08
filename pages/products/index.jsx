import Layout from "../../components/layout";
import Card from "../../components/Card";
import Spinner from "../../components/Spinner";
import ModalFilters from "../../components/FiltersModal/Modal";
import OrderSelect from "../../components/OrderSelect";
import { useState } from "react";
import { IoMdOptions } from "react-icons/io";
import { useGetProductsQuery } from "../../redux/productsApi";
import MiniSpinner from "../../components/miniSpinner";

function camelize(str) {
  const aux = str.split("");
  aux[0] = aux[0].toUpperCase();
  return aux.join("");
}

const Store = (initialParams) => {
  const [activeFiltersModal, setActiveFiltersModal] = useState(false);
  const { isLoading, data: productos } = useGetProductsQuery(initialParams);
  return (
    <>
      <Layout>
        <section className="main">
          <div className="mt-4 flex justify-between items-center gap-6 max-sm:flex-col max-sm:">
            {initialParams.search && (
              <h2 className="text-lg text-fondo-300 font-medium max-sm:self-start transition-all align-middle">
                {productos ? productos.length : <MiniSpinner />}
                {` result(s) for "${initialParams.search}"`}
              </h2>
            )}
            {initialParams.category && (
              <h2 className="text-lg text-fondo-300 font-bold max-sm:self-start transition-all align-middle">
                {`${camelize(initialParams.category)} `}
                {productos ? `(${productos.length})` : <MiniSpinner />}
              </h2>
            )}
            <div className="flex gap-4 max-sm:w-full max-sm:justify-between">
              <button
                onClick={() => setActiveFiltersModal((state) => !state)}
                className="filter_btn"
              >
                <p>Filters</p>
                <IoMdOptions />
              </button>
              <OrderSelect initialParams={initialParams} />
            </div>
          </div>
          {console.log("test")}
          <hr className="my-4" />
          <div className="bg-zinc-100 w-full rounded-xl mt-6 mb-12">
            <div className="flex flex-col gap-y-10 items-center py-10 min-h-[164px] justify-center overflow-hidden ">
              {isLoading && <Spinner />}
              {productos?.map((product, index) => (
                <Card
                  key={product.id}
                  style="wider"
                  product={product}
                  delay={index}
                />
              ))}
            </div>
          </div>
        </section>
        <ModalFilters
          active={activeFiltersModal}
          setActive={setActiveFiltersModal}
        />
      </Layout>
    </>
  );
};

export default Store;

export async function getServerSideProps({ query }) {
  return {
    props: {
      search: query.search || null,
      category: query.category || null,
    },
  };
}
