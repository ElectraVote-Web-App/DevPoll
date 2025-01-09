import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Toaster, toast } from "sonner";
import { cn } from "@/lib/utils";
import BackButton from "@/components/BackButton";
import axiosClient from "@/http/axiosConfig";
import { DateTimePicker24h } from "@/components/ui/DateTimePicker24h";
import { useParams } from "react-router-dom";

// need to add logic to get pollId
const EditPoll = () => {
  const [options, setOptions] = useState([]);
  const [hideResults, setHideResults] = useState(false);
  const [errors, setErrors] = useState({});
  const [formValues, setFormValues] = useState({
    title: "",
    description: "",
  });
  const [endTime, setEndTime] = useState("");
  const {id} = useParams()
  const pollId = id

  useEffect(() => {
    // Fetch poll data and populate the form
    const fetchPoll = async () => {
      try {
        const { data } = await axiosClient.get(`/polls/${pollId}`);
        setFormValues({ title: data.title, description: data.description });
        setOptions(data.options);
        setEndTime(data.endTime);
        setHideResults(data.type === "vote");
        console.log(data)
      } catch (error) {
        console.error("Error fetching poll data:", error);
        toast.error("Failed to load poll data.");
      }
    };

    fetchPoll();
  }, [pollId]);

  const handleAddOption = () => setOptions((prev) => [...prev, ""]);
  const handleRemoveOption = (index) => {
    setOptions((prev) => prev.filter((_, i) => i !== index));
  };
  const handleOptionChange = (index, value) => {
    setOptions((prev) => prev.map((opt, i) => (i === index ? value : opt)));
  };
  const handleInputChange = (field, value) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: validateField(field, value) }));
  };

  const validateField = (field, value) => {
    if (field === "title" && !value.trim()) return "Title is required.";
    if (field === "options" && options.some((opt) => !opt))
      return "All options must be filled.";
    if (field === "endTime" && !value) return "End time is required.";
    return "";
  };

  const validateForm = () => {
    const titleError = validateField("title", formValues.title);
    const optionsError = validateField("options", options);
    const endTimeError = validateField("endTime", endTime);

    const hasErrors = titleError || optionsError || endTimeError;
    setErrors({
      title: titleError,
      options: optionsError,
      endTime: endTimeError,
    });

    return !hasErrors;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    console.log('form validated')

    const pollData = {
      ...formValues,
      type: hideResults ? "vote" : "sondage",
      options,
      end_time: endTime,
    };
    console.log(pollData)

    try {
      await axiosClient.put(`/polls/${pollId}`, pollData);
      toast.success("Poll updated successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Error updating poll. Please try again.");
    }
  };

  return (
    <div className="pb-16">
      <BackButton />
      <div className="max-w-[700px] mx-auto p-6 bg-white rounded-lg shadow-lg space-y-6">
        <h2 className="text-2xl font-semibold text-center">Edit Poll</h2>
        <p className="text-sm text-gray-500 text-center">
          Update the details below to edit the poll.
        </p>

        {/* Title Field */}
        <div className="flex flex-col space-y-2">
          <label htmlFor="title" className="text-sm font-medium">
            Title
          </label>
          <Input
            id="title"
            placeholder="Enter poll title"
            value={formValues.title}
            className={cn("flex-1", errors.title && "border-red-500")}
            onChange={(e) => handleInputChange("title", e.target.value)}
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title}</p>
          )}
        </div>

        {/* Options Field */}
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium">Options</label>
          {options.map((option, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Input
                value={option.content}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                placeholder={`Option ${index + 1}`}
                className={cn("flex-1", errors.options && "border-red-500")}
              />
              {options.length > 2 && (
                <Button
                  variant="destructive"
                  onClick={() => handleRemoveOption(index)}
                  className="bg-black text-white"
                >
                  Remove
                </Button>
              )}
            </div>
          ))}
          <Button onClick={handleAddOption} className="mt-2 self-start">
            Add Option
          </Button>
          {errors.options && (
            <p className="text-red-500 text-sm">{errors.options}</p>
          )}
        </div>

        {/* End Time Picker */}
        <DateTimePicker24h
  initialDate={endTime}  // Pass the end_time as initialDate
  onChange={(formattedDate) => {
    // Handle the formatted date when the user selects or changes it
    console.log("Selected Date:", formattedDate);
  }}
/>

        {/* Description Field */}
        <div className="flex flex-col space-y-2">
          <label htmlFor="description" className="text-sm font-medium">
            Description
          </label>
          <Textarea
            id="description"
            placeholder="Describe your poll"
            value={formValues.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
          />
        </div>

        {/* Hide Results and Submit */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Switch
              id="hideResults"
              checked={hideResults}
              onCheckedChange={setHideResults}
            />
            <label htmlFor="hideResults" className="text-sm font-medium">
              Hide Results
            </label>
          </div>
          <Button onClick={handleSubmit} className="bg-black text-white mt-4">
            Update Poll
          </Button>
        </div>
        <Toaster richColors />
      </div>
    </div>
  );
};

export default EditPoll;
