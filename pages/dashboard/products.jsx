import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import CreationForm from "../../components/Dashboard/Products/CreationForm";
import dashboardMiddleware from "../../utils/dashboardMiddleware";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import {
  useGetCompanyQuery,
  useLazyGetCompanyPlanQuery,
} from "../../redux/companyApi";
import Spinner from "../../components/Spinners/Spinner";
import ProductCard from "../../components/Dashboard/products/ProductCard";

const Products = ({ company: { email } }) => {
  const { isFetching, data: company } = useGetCompanyQuery(email);
  const [fetchCompany, { data: plan }] = useLazyGetCompanyPlanQuery();
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (company) {
      fetchCompany(company.plan);
    }
  }, [company]);

  return (
    <DashboardLayout>
      <AnimatePresence>
        {active && <CreationForm setActive={setActive} />}
      </AnimatePresence>
      <div className="relative">
        <div className="flex justify-between items-center">
          <h2 className="text-fondo-400 text-2xl font-bold">Your Products</h2>
          <button
            onClick={() => {
              setActive(true);
              document.body.style.overflow = "hidden";
            }}
            className="py-3 bg-fondo-300 text-zinc-100 px-2 rounded-md"
          >
            Create Product
          </button>
        </div>
        {/* products */}
        <div className="pt-10 pb-40 relative">
          {isFetching && (
            <div className="flex justify-center absolute z-50 top-0 left-0 w-full min-h-screen bg-zinc-50 bg-opacity-60">
              <div className="mt-48 flex items-center justify-center bg-zinc-700 rounded-md h-28 w-[300px]">
                <p className="mr-4 text-zinc-100 text-lg">Loading products</p>
                <Spinner />
              </div>
            </div>
          )}
          {company && (
            <div className="grid_dashboard_products">
              {company.products.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Products;

export async function getServerSideProps(context) {
  return await dashboardMiddleware(context);
}
