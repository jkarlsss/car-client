import { useEffect, useState } from "react"
import { Toaster } from "react-hot-toast";

const ClientToaster = () => {

    const [show, setShow] = useState(false);

    useEffect(() => {
    
        setShow(true);

    }, [])

  return show ? <Toaster /> : null;
}

export default ClientToaster