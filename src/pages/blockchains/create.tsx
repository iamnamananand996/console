import { FC, ReactElement } from "react";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";

import { env, CreateBlockchainForm } from "@instill-ai/toolkit";
import { PageTitle, PageHead, Topbar, Sidebar, PageBase } from "@/components";

export const getServerSideProps: GetServerSideProps = async () => {
  if (env("NEXT_PUBLIC_DISABLE_CREATE_UPDATE_DELETE_RESOURCE")) {
    return {
      redirect: {
        destination: "/blockchains",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

type GetLayOutProps = {
  page: ReactElement;
};

const CreateBlockchainPage: FC & {
  getLayout?: FC<GetLayOutProps>;
} = () => {
  const router = useRouter();

  /* -------------------------------------------------------------------------
   * Render
   * -----------------------------------------------------------------------*/

  return (
    <>
      <PageHead title="Set up Blockchain connector" />
      <div className="flex flex-col">
        <PageTitle
          title="Set Up New Blockchain Connector"
          breadcrumbs={["Blockchain", "Blockchain Connector Settings"]}
          disabledButton={true}
          marginBottom="mb-10"
        />
        <CreateBlockchainForm
          accessToken={null}
          onCreate={() => router.push("/blockchains")}
        />
      </div>
    </>
  );
};

CreateBlockchainPage.getLayout = (page) => {
  return (
    <PageBase>
      <Topbar />
      <PageBase.Container>
        <Sidebar />
        <PageBase.Content>{page}</PageBase.Content>
      </PageBase.Container>
    </PageBase>
  );
};

export default CreateBlockchainPage;
