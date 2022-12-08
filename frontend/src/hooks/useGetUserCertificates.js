import React, { useEffect, useState } from 'react';
import { axiosPrivate } from '../api/axios';
import useAppProvider from './useAppProvider';

const useGetUserCertificates = () => {
    // const { setPricing, setLoading } = useAppProvider();
    const [csvData, setCsvData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pricing, setPricing] = useState("");
    
  useEffect(() => {
    let controller = new AbortController();
    const getUserCertificates = async () => {
        setLoading(true);
        const response = await axiosPrivate.get("/certificates");
        const userSubscriptionPlan = localStorage.getItem("subscription");
        setCsvData(response.data)
        setPricing(userSubscriptionPlan);
        console.log('response', response);
        setLoading(false);
    }
    getUserCertificates();
    return () => controller?.abort();
  }, []);
  return {csvData, loading, pricing};
}

export default useGetUserCertificates;