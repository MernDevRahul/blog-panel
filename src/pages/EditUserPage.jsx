import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import EditUserLayer from "../components/EditUserLayer";

const EditUserPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title='Add User' />

        {/* AddUserLayer */}
        <EditUserLayer />
      </MasterLayout>
    </>
  );
};

export default EditUserPage;
