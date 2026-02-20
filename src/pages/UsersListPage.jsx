import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import UsersListLayer from "../components/UsersListLayer";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchAllUser } from "../redux/slice/userSlice";

const UsersListPage = () => {
  const dispatch = useDispatch()
  const { allUsers } = useSelector((state)=>state.user);

  useEffect(()=>{
    if(allUsers == null){
      dispatch(fetchAllUser())
    }
  },[allUsers])
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title='All Users' />

        {/* UsersListLayer */}
        <UsersListLayer />
      </MasterLayout>
    </>
  );
};

export default UsersListPage;
