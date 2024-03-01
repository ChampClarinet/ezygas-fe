"use client";
import { useCallback, useEffect, useState } from "react";
import { Location, Subdistrict } from "@/api/location";
import LocationAPI from "@/api/location";

export const useProvinces = () => {
  const [loading, setLoading] = useState(false);
  const [provinces, setProvinces] = useState<Location[]>([]);
  const [dropdownClicked, setDropdownClicked] = useState(false);

  const onLazyLoad = useCallback(async () => {
    setLoading(true);
    const provinces = await LocationAPI.fetchProvinces();
    setLoading(false);
    setProvinces(provinces);
    return provinces;
  }, []);

  const handleDropdownClick = useCallback(() => {
    if (!dropdownClicked) {
      setDropdownClicked(true);
      onLazyLoad();
    }
  }, [dropdownClicked, onLazyLoad]);

  return {
    provinces,
    onLazyLoadProvinces: handleDropdownClick,
    provincesLoading: loading,
  };
};

export const useDistrict = (provinceId: null | number) => {
  const [loading, setLoading] = useState(false);
  const [districts, setDistricts] = useState<Location[]>([]);

  const load = useCallback(async (provinceId: number | null) => {
    if (provinceId == null) return setDistricts([]);
    setLoading(true);
    const response = await LocationAPI.fetchDistricts(provinceId || undefined);
    setLoading(false);
    setDistricts(response);
    return response;
  }, []);

  useEffect(() => {
    load(provinceId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [provinceId]);

  return {
    districts,
    districtsLoading: loading,
    onLoad: load,
  };
};

export const useSubdistrict = (districtId: null | number) => {
  const [loading, setLoading] = useState(false);
  const [subdistricts, setSubdistricts] = useState<Subdistrict[]>([]);

  const load = useCallback(async (districtId: number | null) => {
    if (districtId == null) return setSubdistricts([]);
    setLoading(true);
    const response = await LocationAPI.fetchSubdistricts(
      districtId || undefined
    );
    setLoading(false);
    setSubdistricts(response);
    return response;
  }, []);

  useEffect(() => {
    load(districtId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [districtId]);

  return {
    subdistricts,
    subdistrictsLoading: loading,
    onLoad: load,
  };
};
