import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Adjust based on your routing library
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Toaster, toast } from "sonner";
import { cn } from "@/lib/utils";
import BackButton from "@/components/BackButton";
import axiosClient from "@/http/axiosConfig";
import { DateTimePicker24h } from "@/components/ui/DateTimePicker24h";

const EditPoll = () => {
  const { pollId } = useParams(); // Get pollId from route params
  const navigate = useNavigate();

  // State management
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [formattedDate, setEndTime] = useState(null);
  const [options, setOptions] = useState([]);
  const [hideResults, setHideResults] = useState(false);
  const [errors, setErrors] = useState({});

  // Fetch poll details
  useEffect(() => {
    axiosClient
      .get(`/polls/${pollId}`)
      .then((response) => {
        const { title, description, end_time, options, type } = response.data;
        setTitle(title);
        setDescription(description);
        setHideResults(type === "vote");
        setEndTime(new Date(end_time)); // Use raw ISO string as the `DateTimePicker24h` handles formatting
        setOptions(
          options.map((option) => ({ id: option.id, content: option.content }))
        );
      })
      .catch(() => {
        toast.error("Failed to load poll details");
      });
  }, [pollId]);

  const formatDateForMySQL = (isoDate) => {
    const date = new Date(isoDate);
    return date.toISOString().slice(0, 19).replace("T", " ");
  };

  // Add a new option
  const handleAddOption = () => {
    setOptions([...options, { id: null, content: "" }]);
  };

  // Remove an option
  const handleRemoveOption = (index) => {
    setOptions(options.filter((_, i) => i !== index));
  };

  // Update poll
  const handleSubmit = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = "Title is required.";
    if (options.length < 2)
      newErrors.options = "At least 2 options are required.";
    if (!formattedDate) newErrors.formattedDate = "End time is required.";
  
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
  
    const mysqlFormattedDate = formatDateForMySQL(formattedDate);
    axiosClient
      .put(`/polls/${pollId}`, {
        title,
        description,
        end_time: mysqlFormattedDate,
        options: options.map((option) => ({
          id: option.id,
          content: option.content,
        })),
        type: hideResults ? "vote" : "sondage",
      })
      .then(() => {
        navigate(`/polls/${pollId}`, {
          state: { toastMessage: "Poll updated successfully" },
        });
      })
      .catch(() => {
        toast.error("Failed to update poll");
      });
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
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={cn("flex-1", errors.title && "border-red-500")}
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
                onChange={(e) => {
                  const updatedOptions = [...options];
                  updatedOptions[index].content = e.target.value;
                  setOptions(updatedOptions);
                }}
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
        <div className="flex flex-col space-y-2">
          <label htmlFor="endTime" className="text-sm font-medium">
            End Time
          </label>
          <DateTimePicker24h
            date={formattedDate}
            onChange={(formattedDate) => {
              console.log("Selected Date:", formattedDate);
              setEndTime(new Date(formattedDate));
            }}
          />
          {errors.formattedDate && (
            <p className="text-red-500 text-sm">{errors.formattedDate}</p>
          )}
        </div>

        {/* Description Field */}
        <div className="flex flex-col space-y-2">
          <label htmlFor="description" className="text-sm font-medium">
            Description
          </label>
          <Textarea
            id="description"
            placeholder="Describe your poll"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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
