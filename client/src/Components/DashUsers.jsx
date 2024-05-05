import { Button, Modal, Table } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useSelector } from "react-redux";
import {FaCheck,FaTimes } from 'react-icons/fa'


export default function DashUsers() {
  const { currentUser } = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`/api/user/getusers`);
        const data = await res.json();

        if (res.ok) {
          setUsers(data.users);
          if (users.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchUsers();
    }
  }, [currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = users.length;
    try {
      const res = await fetch(
        `/api/user/getusers?startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setUsers((prev) => [...prev, ...data.users]);
        if (data.users.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleDeleteUser = async () => {
    setShowModal(false);
    try {
      const res = await fetch(
        `/api/user/delete/${userToDelete}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        setUsers((prev) => 
          prev.filter((user) => user._id !== userToDelete)
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <>
      <div className="w-full overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
        {" "}
        {
        currentUser.isAdmin && users.length > 0 ? (
          <Table hoverable className="shadow-md">
            <Table.Head>
              <Table.HeadCell>Date created</Table.HeadCell>
              <Table.HeadCell>User Image</Table.HeadCell>
              <Table.HeadCell>Username</Table.HeadCell>
              <Table.HeadCell>Email</Table.HeadCell>
              <Table.HeadCell>Admin</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
            </Table.Head>
            {users.map((user) => (
              <Table.Body className="divide-y" key={user._id}>
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell>
                    {new Date(user.createdAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                   
                      <img
                        src={user.profilePicture}
                        alt={user.username}
                        className="w-11 h-11 object-cover rounded-full bg-gray-500"
                      />
                   
                  </Table.Cell>
                  <Table.Cell>
                   
                      {user.username}
                    
                  </Table.Cell>
                  <Table.Cell>{user.email}</Table.Cell>
                  <Table.Cell>{user.isAdmin ? (<FaCheck className="text-green-500"/>):(<FaTimes className="text-red-500"/>)}</Table.Cell>
                  <Table.Cell>
                    <span
                      className="font-medium text-gray-900
                      dark:text-white hover:underline cursor-pointer"
                      onClick={() => {
                        setShowModal(true);
                        setUserToDelete(user._id);
                      }}
                    >
                      Delete
                    </span>
                  </Table.Cell>
                  
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
        ) : (
          <div className=" flex justify-center mx-auto">
            {" "}
            <h1 className="text-gray-500 x text-4xl"> You have no Users!!</h1>
          </div>
        )}
        {showMore && (
          <button
            onClick={handleShowMore}
            className="w-full text-teal-500 self-center py-7"
          >
            Show More
          </button>
        )}
        {
          <Modal
            show={showModal}
            onClose={() => setShowModal(false)}
            popup
            size="md"
          >
            <Modal.Header />
            <Modal.Body>
              <div className="text-center">
                <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
                <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
                  Are you sure you want to delete this user?
                </h3>
                <div className="flex gap-2 text-center items-center justify-center">
                  <Button color="failure" onClick={handleDeleteUser}>
                    Yes , I'm Sure
                  </Button>
                  <Button color="gray" onClick={() => setShowModal(false)}>
                    No , Cancel
                  </Button>
                </div>
              </div>
            </Modal.Body>
          </Modal>
        }
      </div>
    </>
  );
}
