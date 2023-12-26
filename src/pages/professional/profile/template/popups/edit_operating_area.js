
import deleteIcon from "../../../../../images/professional/delete_icon.svg";
import spinner from "../../../../../images/spinner.svg";
import ClickAwayListener from "react-click-away-listener";

import { useEffect, useState } from "react";
import { AiOutlineClose, AiOutlinePlus } from "react-icons/ai";
import Select from "../../../../../components/select";
import MultiSelect from "../../../../../components/multi_select";
import { useProfessionalContext } from "../../../../../contexts/ProfessionalContextProvider";
import { useAuthContext } from "../../../../../contexts/AuthContextProvider";
import ErrorPopUp from "../../../../../components/error_popup";
import SuccessPopUp from "../../../../../components/success_popup";

export default function EditOperatingArea({ showModel, setShowModel, data, id = 2, type = "desired", }) {

    const {

        updateTeamMembers,
        provincesAndMunicipalities,
        getProvincesAndMunicipalities,
        desiredLocation,
        updateDesiredLocation,
        getDesiredLocation

    } = useProfessionalContext();
    const { token } = useAuthContext();
    const [rows, setRows] = useState([{
        provinceId: null,
        municipalitiesIds: [],
    }]);
    const [disabledProvinces, setDisabledProvinces] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [showErrorModel, setShowErrorModel] = useState(false)
    const [showSuccessPopUp, setShowSuccessPopUp] = useState(false)
    const [successTitle, setSuccessTitle] = useState('')


    const [everyWhere, setEveryWhere] = useState(false);
    const [specificArea, setSpecificArea] = useState(false);

    const fetchProvincesAndMunicipalites = async () => {
        await getProvincesAndMunicipalities(token);
    };

    const setFormData = () => {
        data && data.desire_location_type && setEveryWhere(data.desire_location_type == "everywhere")
        data && data.desire_location_type && setSpecificArea(data.desire_location_type == "desired")
        data && data.province && Array.isArray(JSON.parse(JSON.parse(desiredLocation?.province))) && setRows(JSON.parse(JSON.parse(desiredLocation?.province)))
    }

    useEffect(() => {
        fetchProvincesAndMunicipalites();
    }, [showModel]);


    useEffect(() => {
        setFormData();
    }, [showModel]);



    // Function to add a new row
    const addRow = () => {
        const newRow = {
            provinceId: null,
            municipalitiesIds: [],
        };
        setRows([...rows, newRow]);
    };

    // Function to delete a row
    const deleteRow = (index) => {
        const selectedCategoryData = rows[index] && rows[index].provinceId && rows[index].provinceId

        if (selectedCategoryData) {
            setDisabledProvinces(disabledProvinces.filter(item => item != selectedCategoryData.id))
        }
        const updatedRows = rows.filter((_, rowIndex) => rowIndex !== index);
        setRows(updatedRows);

    };

    const handleCategoryChange = async (selectedOption, rowIndex) => {
        try {
            if (selectedOption) {
                const selectedCategoryId = selectedOption.id;
                const selectedCategoryData = provincesAndMunicipalities.find(
                    (category) => category.id == selectedCategoryId
                );
                console.log(selectedCategoryData)

                if (selectedCategoryData) {
                    // Update the selected category for the specific row
                    const updatedRows = rows.map((row, index) => {
                        if (index === rowIndex) {
                            return {
                                ...row,
                                provinceId: selectedOption,
                                municipalitiesIds: [], // Reset municipalitiesIds when category changes
                                municipalities: selectedCategoryData.municipalities || []
                                // Reset municipalitiesIds when category changes
                            };
                        }
                        return row;
                    });
                    setRows(updatedRows);

                    // Update disabled categories to prevent selection in other rows
                    // const updatedDisabledCategories = disabledProvinces.push(selectedCategoryId);
                    setDisabledProvinces([...disabledProvinces, selectedCategoryId]);

                }
            }
        } catch (error) {
            // Handle error while fetching municipalities
            console.error('Error fetching municipalities:', error);
        }
    };

    const handleSelectService = (selectedIds, rowIndex) => {
        // Update the municipalitiesIds for the specific row
        const updatedRows = rows.map((row, index) => {
            if (index === rowIndex) {
                return {
                    ...row,
                    municipalitiesIds: selectedIds,
                };
            }
            return row;
        });
        setRows(updatedRows);
    };

    const isFormValid = () => {
        // Check if all fields are filled for each row
        if (specificArea) {
            return rows.every(row => row.provinceId && row.municipalitiesIds.length > 0) && specificArea
        }
        if (everyWhere) {
            return everyWhere
        }

        return false
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        if (!isFormValid()) {
            setError("Please fill all fields.");
            setLoading(false);
            setShowErrorModel(true);
            return;
        }

        const data = new FormData();
        if (specificArea) {
            data.append('province', JSON.stringify(rows))
            data.append('desire_location_type', "desired")
        }
        if (everyWhere) {
            data.append('desire_location_type', "everywhere")
        }
        data.append('type', "desired")

        const response = await updateDesiredLocation(token, data);
        if (!(response && response.success)) {
            setError("Please check your credentials again.");
            setLoading(false);
            setShowErrorModel(true);
        }
        else {
            setSuccessTitle(response.message)
            setLoading(false);
            setShowSuccessPopUp(true)
        }

        setLoading(false);


    };

    return (
        <div>
            {showModel &&
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div
                        onClick={() => setShowModel(false)}
                        className="fixed inset-0 bg-black opacity-[66%]"
                    />
                    <div className="relative z-50 w-[95%] md:w-[28rem] mx-auto my-6  flex items-center h-screen overflow-y-scroll no-scrollbar">
                        <ClickAwayListener onClickAway={() => setShowModel(false)}>
                            <div className="relative px-2 w-full py-4 bg-white rounded-lg shadow-lg">
                                <div className="flex flex-col items-start gap-2 px-5 rounded-t">
                                    <h3 className="w-full text-lg font-bold text-center text-softblue">
                                        Edit Operating Areas
                                    </h3>
                                </div>
                                <div className="px-5 pt-9">
                                    {/* <form> */}

                                    <div className="flex flex-col gap-3 my-1">
                                        <div className="flex items-center gap-6">
                                            <label
                                                htmlFor="onlyWomen"
                                                className="mr-2 text-base font-normal cursor-pointer"
                                            >
                                                Everywhere In Netherland
                                            </label>
                                            <input
                                                type="checkbox"
                                                checked={everyWhere}
                                                onChange={(e) => { setEveryWhere(!everyWhere); setSpecificArea(false) }}

                                                className="w-4 h-4 border-2 rounded-sm appearance-none cursor-pointer"
                                            />
                                        </div>
                                        <div className="flex items-center w-full gap-28">
                                            <label
                                                htmlFor="onlyWomen"
                                                className="mr-2 text-base font-normal cursor-pointer"
                                            >
                                                Specific Areas
                                            </label>
                                            <input
                                                type="checkbox"
                                                checked={specificArea}
                                                onChange={(e) => { setSpecificArea(!specificArea); setEveryWhere(false) }}

                                                className="w-4 h-4 border-2 rounded-sm appearance-none cursor-pointer"
                                            />
                                        </div>
                                    </div>


                                    {/* Rows for Category and Services */}
                                    {(specificArea && !everyWhere) && rows.map((row, index) => (
                                        <div key={index} className="flex items-center gap-2 ">
                                            <div className="w-full">
                                                <Select
                                                    placeholder="Select Province"
                                                    options={provincesAndMunicipalities ? provincesAndMunicipalities.map((category) => ({
                                                        id: category.id,
                                                        value: category.label_en,
                                                        label: category.label_en
                                                    })).filter((category) => !disabledProvinces.includes(category.id)) : []}
                                                    selectedOption={row.provinceId ? row.provinceId : null}
                                                    handelChange={(selectedOption) => handleCategoryChange(selectedOption, index)}
                                                />
                                            </div>
                                            <div className="w-full ">

                                                <MultiSelect
                                                    placeholder={"Select Municipalities"}
                                                    options={rows[index].municipalities?.length ? rows[index].municipalities.map((category) => ({
                                                        id: category.id,
                                                        value: category.label_en,
                                                        label: category.label_en
                                                    })) : []}
                                                    selectedOptions={row.municipalitiesIds || []}
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
                                        (specificArea && !everyWhere) && provincesAndMunicipalities && provincesAndMunicipalities.map((category) => ({
                                            id: category.id,
                                            value: category.label_en,
                                            label: category.label_en
                                        })).filter((category) => !disabledProvinces.includes(category.id)).length > 0 && <div className="flex items-center justify-end w-full mt-2 space-x-2">
                                            <button onClick={addRow} className="flex items-center gap-2 px-3 py-2 text-base font-normal rounded-full bg-customBlue bg-opacity-10 text-customBlue focus:ring-0 ">
                                                <AiOutlinePlus /> <span>Province </span>
                                            </button>

                                        </div>
                                    }



                                    <button disabled={loading} onClick={handleSubmit} className={`${loading ? "bg-gray-100  flex items-center justify-center" : "bg-customGreen"} text-white mt-4 w-full py-3  mb-4  rounded-md text-base font-medium`} >
                                        {
                                            loading ?
                                                <img src={spinner} alt="Loading" width={28} height={28} className="animate-spin " /> : "Save"
                                        }
                                    </button>
                                    {/* error popup */}
                                    <ErrorPopUp title={error} showModel={showErrorModel} setShowModel={setShowErrorModel} />
                                    <SuccessPopUp closeAction={() => setShowModel(false)} title={successTitle} showModel={showSuccessPopUp} setShowModel={setShowSuccessPopUp} />


                                    {/* </form> */}
                                </div>
                                <AiOutlineClose
                                    onClick={() => setShowModel(false)}
                                    className="absolute cursor-pointer top-5 right-5"
                                />
                            </div>
                        </ClickAwayListener>
                    </div>
                </div>}
        </div>
    );
}
