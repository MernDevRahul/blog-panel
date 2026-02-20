import { Icon } from "@iconify/react/dist/iconify.js";
import { useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteUser } from "../redux/slice/userSlice";

const UsersListLayer = () => {
  const dispatch = useDispatch()
  const { allUsers, user } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate()

  // 🔎 Filtered Users
  const filteredUsers = useMemo(() => {
    if (!searchTerm) return allUsers;

    return allUsers?.filter((user) =>
      `${user?.name} ${user?.email}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, allUsers]);


const handleDelete = async (id) => {
  if (!window.confirm("Are you sure you want to delete this user?"))
    return;

  try {
    await dispatch(deleteUser(id)).unwrap();
    toast.success("User deleted successfully");
  } catch (error) {
    toast.error(error?.message || "Delete failed");
  }
};
  return (
    <div className="card h-100 p-0 radius-12">
      <div className="card-header border-bottom bg-base py-16 px-24 d-flex align-items-center flex-wrap gap-3 justify-content-between">
        <div className="d-flex align-items-center flex-wrap gap-3">
          <form className="navbar-search">
            <input
              type="text"
              className="bg-base h-40-px w-auto"
              name="search"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Icon icon="ion:search-outline" className="icon" />
          </form>
        </div>
        <Link
          to="/add-user"
          className="btn btn-primary text-sm btn-sm px-12 py-12 radius-8 d-flex align-items-center gap-2"
        >
          <Icon
            icon="ic:baseline-plus"
            className="icon text-xl line-height-1"
          />
          Add New User
        </Link>
      </div>
      <div className="card-body p-24">
        <div className="table-responsive scroll-sm">
          <table className="table bordered-table sm-table mb-0">
            <thead>
              <tr>
                <th scope="col">
                  <div className="d-flex align-items-center gap-10">
                    <div className="form-check style-check d-flex align-items-center"></div>
                    S.L
                  </div>
                </th>
                <th scope="col">Join Date</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col" className="text-center">
                  Action
                </th>
              </tr>
            </thead>
             <tbody>
              {filteredUsers?.length > 0 ? (
                filteredUsers.map((u, ind) => {
                  const rowUserId = u?._id?.toString();
                  const isCurrentUser =
                    user?._id?.toString() === rowUserId;
                  return (
                    <tr key={u._id}>
                      <td>{ind + 1}</td>

                      <td>
                        {u?.createdAt
                          ? new Date(u.createdAt).toLocaleDateString()
                          : "-"}
                      </td>

                      <td>
                        <div className="d-flex align-items-center">
                          <img
                            src={u?.profile || "/default-avatar.png"}
                            alt="User"
                            className="w-40-px h-40-px rounded-circle flex-shrink-0 me-12 overflow-hidden"
                          />
                          <div className="flex-grow-1">
                            <span className="text-md fw-normal text-secondary-light">
                              {u?.name}{" "}
                              {isCurrentUser && (
                                <span className="text-primary">
                                  (you)
                                </span>
                              )}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td>{u?.email}</td>

                      <td className="text-center">
                        <div className="d-flex align-items-center gap-10 justify-content-center">
                          {/* Edit Button */}
                          <button
                            type="button"
                            onClick={()=>{
                              navigate(`/edit-user/${u?._id}`)
                            }}
                            className="bg-success-focus text-success-600 bg-hover-success-200 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle"
                          >
                            <Icon icon="lucide:edit" />
                          </button>

                          {/* Delete Button */}
                          <button
                            type="button"
                            disabled={isCurrentUser}
                            className="remove-item-btn bg-danger-focus bg-hover-danger-200 text-danger-600 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle"
                            onClick={()=>handleDelete(u._id)}
                          >
                            <Icon icon="fluent:delete-24-regular" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-4">
                    No Users Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UsersListLayer;
