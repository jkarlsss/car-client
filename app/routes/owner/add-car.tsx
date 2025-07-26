import { useState } from "react";
import Title from "../../components/owner/Title"

const AddCar = () => {

  const [image, setImage] = useState(null);

  return (
    <div className="px-4 pt-10 md:px-10 flex-1">
      <Title title="Add Car" subtitle="Add a new car to your fleet" />
    </div>
  )
}

export default AddCar