import type { NextPage } from "next";
import { useToggle } from "../hooks/useToggle";
import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import A from "../components/A";

const CustomPhoneInput = dynamic(() => import('../components/CustomPhoneInput/CustomPhoneInput'), {
  suspense: true,
})

const Home: NextPage = () => {
  const [openInput, setOpenInput] = useToggle(false);

  return (
    <div>
      <A />
      <button onClick={setOpenInput}>Enter phone</button>
      {openInput && (
        <>
          <Suspense fallback={`Loading...`}>
            <CustomPhoneInput />
          </Suspense>
        </>
      )}
    </div>
  );
};

export default Home;
