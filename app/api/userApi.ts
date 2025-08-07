import axios from "axios";

export const fetchUserData = async () => {
        
        try {
            const { data } = await axios.get('/api/user/data');

            if (!data.success) throw new Error('Failed to send request');

            return data.user;

        } catch (error) {
            console.error(error);
            return null;
        }

}

  export const fetchUser = async () => {
        const localToken = localStorage.getItem('token');
        if (!localToken) return null;
        axios.defaults.headers.common['Authorization'] = `Bearer ${localToken}`;
        try {
            const {data} = await axios.get('/api/user/data');
            if (!data.success) return null;
            
            return data.user;

        } catch (error : any) {
            console.error(error);
            return null;
        }
    }

export const fetchDashboardData = async () => {
    try {
        const { data } = await axios.get('/api/owner/dashboard-data');

        if(!data.success) return false;

        return data;

    } catch (error) {
        console.error(error);
        return false;
    }
}

export const updateUserToOwner = async () => {
    try {
        const { data } = await axios.post('/api/owner/change-role');
        
        if (!data.success) return null;

        return data.success;

    } catch (error) {
        console.error(error);
        return null;
    }
}

export const updateUserImage = async (image: File) => {
    try {
        const { data } = await axios.post('/api/owner/update-image', {image}, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })

        if (!data.success) return false;

        return data.success;

    } catch (error) {
        console.error(error);
        return false;
    }
}