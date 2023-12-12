
import { BsCamera } from "react-icons/bs";
import spinner from "../../../../../images/spinner.svg";

import deleteIcon from "../../../../../images/professional/delete_icon.svg";
import uploadIcon from "../../../../../images/professional/upload_icon.svg";
import { useEffect, useRef, useState } from "react";
import { AiOutlineClose, AiOutlinePlus } from "react-icons/ai";
import Select from "../../../../../components/select";
import MultiSelect from "../../../../../components/multi_select";
import { useProfessionalContext } from "../../../../../contexts/ProfessionalContextProvider";
import { useAuthContext } from "../../../../../contexts/AuthContextProvider";
import SuccessPopUp from "../../../../../components/success_popup";
import ErrorPopUp from "../../../../../components/error_popup";

export default function AddTeamMember({ id, type, showModel, setShowModel }) {
  console.log("add team member", id)
  const {
    addTeamMembers,
    getCategoryAndServiceForTeam,
    categoryAndServiceForTeam
  } = useProfessionalContext();
  const { token } = useAuthContext();

  const [selectedImage, setSelectedImage] = useState(null);
  const [categoriesOptions, setCategoriesOptions] = useState([]);
  const [servicesOptions, setServicesOptions] = useState([]);
  const [teamMemberName, setTeamMemberName] = useState('');
  const [bio, setBio] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [showErrorModel, setShowErrorModel] = useState(false)

  const [rows, setRows] = useState([{
    categoryId: null,
    serviceIds: [],
  }]);
  const [disabledCategories, setDisabledCategories] = useState([]);
  const fileInputRef = useRef(null);

  useEffect(() => {
    console.log(rows);
  }, [rows]);

  const handleImageUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = e => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = e => {
        setSelectedImage({ file: file, base64: e.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const fetchCategories = async () => {
    console.log("fetching apis...")
    await getCategoryAndServiceForTeam(token, id);
  };
  const setFetchCategories = async () => {
    // console.log('Fetching categories', categoryAndServiceForTeam.toString());
  };



  useEffect(() => {
    setFetchCategories();
  }, [categoryAndServiceForTeam]);

  useEffect(() => {
    fetchCategories();
  }, [showModel]);


  // Function to add a new row
  const addRow = () => {
    const newRow = {
      categoryId: null,
      serviceIds: [],
    };
    setRows([...rows, newRow]);
  };

  // Function to delete a row
  const deleteRow = (index) => {
    const selectedCategoryData = rows[index] && rows[index].categoryId && rows[index].categoryId

    if (selectedCategoryData) {
      setDisabledCategories(disabledCategories.filter(item => item != selectedCategoryData.id))
    }
    const updatedRows = rows.filter((_, rowIndex) => rowIndex !== index);
    setRows(updatedRows);

  };

  const handleTeamMemberNameChange = (e) => {
    setTeamMemberName(e.target.value);
  };

  const handleBioChange = (e) => {
    setBio(e.target.value);
  };

  const isFormValid = () => {
    // Check if all fields are filled for each row
    return rows.every(row => row.categoryId && row.serviceIds.length > 0) &&
      teamMemberName.trim() !== '' &&
      bio.trim() !== '' &&
      selectedImage !== null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    if (!isFormValid()) {
      // If form is not valid, display an error message or handle accordingly
      setError("Please fill all fields.");
      setLoading(false);
      setShowErrorModel(true);
      return;
    }

    const data = new FormData();
    data.append('template_id', id);
    data.append('member', teamMemberName);
    data.append('image', selectedImage.file);
    data.append('service', JSON.stringify(rows));
    data.append('bio', bio);

    const response = await addTeamMembers(token, id, data);
    if (!response) {
      setError("Please check your credentials again.");
      setLoading(false);
      setShowErrorModel(true);
    }
    else {
      setShowModel(false)
      setLoading(false);
    }

    setLoading(false);


  };

  const handleCategoryChange = async (selectedOption, rowIndex) => {
    try {
      if (selectedOption) {
        const selectedCategoryId = selectedOption.id;
        const selectedCategoryData = categoryAndServiceForTeam && categoryAndServiceForTeam.find(
          (category) => category.id == selectedCategoryId
        );
        console.log(selectedCategoryData)

        if (selectedCategoryData) {
          // Update the selected category for the specific row
          const updatedRows = rows.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...row,
                categoryId: selectedOption,
                serviceIds: [], // Reset serviceIds when category changes
                services: selectedCategoryData.services || []
                // Reset serviceIds when category changes
              };
            }
            return row;
          });
          setRows(updatedRows);

          // Update disabled categories to prevent selection in other rows
          // const updatedDisabledCategories = disabledCategories.push(selectedCategoryId);
          setDisabledCategories([...disabledCategories, selectedCategoryId]);

          // Update servicesOptions for the particular row
          const selectedCategoryServices = selectedCategoryData.services || [];
          setServicesOptions(selectedCategoryServices);
        }
      }
    } catch (error) {
      // Handle error while fetching services
      console.error('Error fetching services:', error);
    }
  };

  const handleSelectService = (selectedIds, rowIndex) => {
    // Update the serviceIds for the specific row
    const updatedRows = rows.map((row, index) => {
      if (index === rowIndex) {
        return {
          ...row,
          serviceIds: selectedIds,
        };
      }
      return row;
    });
    setRows(updatedRows);
  };

  return (
    <div>
      {showModel &&
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            onClick={() => setShowModel(false)}
            className="fixed inset-0 bg-black opacity-[66%]"
          />
          <div className="relative z-50 md:w-auto w-[95%] md:min-w-[28rem] mx-auto my-6">
            <div className="relative px-2 py-4 bg-white rounded-lg shadow-lg">
              <div className="flex flex-col items-start gap-2 px-5 rounded-t">
                <h3 className="w-full text-lg font-bold text-center text-softblue">
                  Add Team Member
                </h3>
              </div>
              <div className="px-5 pt-9">

                {/* image */}
                <div>
                  <div
                    className={
                      selectedImage
                        ? "relative w-max mx-auto "
                        : "relative w-max mx-auto text-gray-500  rounded-full"
                    }
                  >
                    {selectedImage
                      ? <div>
                        {" "}<img
                          src={selectedImage.base64}
                          alt="Selected"
                          width={100}
                          height={100}
                          className="object-cover rounded-full shadow-md w-28 h-28"
                        />
                        <div className="absolute bottom-0 right-0 z-50 flex items-center justify-center p-2 bg-white rounded-full shadow-md w-min h-min">
                          <BsCamera
                            size={28}
                            className="text-gray-500 cursor-pointer"
                            onClick={handleImageUploadClick}
                          />
                        </div>
                      </div>
                      : <div className="flex items-center justify-center py-8 bg-gray-300 rounded-full shadow-md px-7">
                        <img
                          alt="Uploaded"
                          src={uploadIcon}
                          className="text-gray-500 cursor-pointer"
                          onClick={handleImageUploadClick}
                        />
                      </div>}
                  </div>
                  <input
                    type="file"
                    id="image"
                    ref={fileInputRef}
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </div>

                {/* Team Member Name */}
                <div>
                  <input
                    type="text"
                    value={teamMemberName}
                    onChange={handleTeamMemberNameChange}
                    placeholder="Team Member Name"
                    className="w-full px-3 py-3 mt-6 text-base font-normal border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-green-400 focus:bg-white"
                  />
                </div>
                {/* bio */}
                <div>
                  <input
                    type="text"
                    value={bio}
                    onChange={handleBioChange}
                    placeholder="Bio"
                    className="w-full px-3 py-3 mt-2 text-base font-normal border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-green-400 focus:bg-white"
                  />
                </div>

                {/* Rows for Category and Services */}
                {rows.map((row, index) => (
                  <div key={index} className="flex items-center gap-2 ">
                    <div className="w-full">
                      <Select
                        placeholder="Select Category"
                        options={categoryAndServiceForTeam ? categoryAndServiceForTeam.map((category) => ({
                          id: category.id,
                          value: category.label_en,
                          label: category.label_en
                        })).filter((category) => !disabledCategories.includes(category.id)) : []}
                        selectedOption={row.categoryId ? row.categoryId : null}
                        handelChange={(selectedOption) => handleCategoryChange(selectedOption, index)}
                      />
                    </div>
                    <div className="w-full ">

                      <MultiSelect
                        placeholder={"Select Services"}
                        options={rows[index].services}
                        selectedOptions={row.serviceIds || []}
                        handleSelect={(selectedIds) => handleSelectService(selectedIds, index)}

                      />

                    </div>
                    {/* Delete row button */}
                    {index == 0 ? <div className="mt-0 h-14 w-14 "></div> :
                      <button onClick={() => deleteRow(index)}>
                        <img
                          src={deleteIcon}
                          alt="deleteIcon"
                          className="mt-0 cursor-pointer h-14 w-14 "
                        />
                      </button>

                    }

                  </div>
                ))}


                {/* copy template and clear all buttons */}
                {
                  categoryAndServiceForTeam && categoryAndServiceForTeam.map((category) => ({
                    id: category.id,
                    value: category.label_en,
                    label: category.label_en
                  })).filter((category) => !disabledCategories.includes(category.id)).length > 0 && <div className="flex items-center justify-end w-full mt-2 space-x-2">
                    <button onClick={addRow} className="flex items-center gap-2 px-3 py-2 text-base font-normal rounded-full bg-customBlue bg-opacity-10 text-customBlue focus:ring-0 ">
                      <AiOutlinePlus /> <span>Category </span>
                    </button>

                  </div>
                }

                <button disabled={loading} onClick={handleSubmit} className={`${loading ? "bg-gray-100  flex items-center justify-center" : "bg-customGreen"} text-white mt-4 w-full py-3  mb-4  rounded-md text-base font-medium`} >
                  {
                    loading ?
                      <img src={spinner} alt="Loading" width={28} height={28} className="animate-spin " /> : "Save"
                  }
                </button>
                {/* <SuccessPopUp title={"Team added Successfully."} showModel={showSuccessPopUp} setShowModel={setShowSuccessPopUp} /> */}
                {/* error popup */}
                <ErrorPopUp title={error} showModel={showErrorModel} setShowModel={setShowErrorModel} />


              </div>
              <AiOutlineClose
                onClick={() => setShowModel(false)}
                className="absolute cursor-pointer top-5 right-5"
              />
            </div>
          </div>
        </div>}
    </div>
  );
}
