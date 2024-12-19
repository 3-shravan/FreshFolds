import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createRequest } from "../store/app/app_Action";

const RequestSubmission = () => {
  const { isAuth, userId } = useSelector((store) => store.authReducer); // Ensure userId is available
  const toast = useToast();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    userId: userId || "", // Initialize to empty string if userId is undefined initially
    pickupDate: "",
    topwears: "",
    bottomwears: "",
    woolenCloths: "",
    others: "",
    serviceType: "",
    contactNumber: "",
    description: "",
  });

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, [isAuth]);

  const handleSubmit = () => {
    // Basic validation for required fields
    if (
      !form.pickupDate ||
      !form.serviceType ||
      !form.contactNumber ||
      !form.userId
    ) {
      toast({
        title: "Error",
        description: "Please fill all required fields.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Dispatch the request action
    dispatch(createRequest(form, toast));
  };

  return (
    <Box p="1rem" w="80%" boxSizing="border-box" bg="#f7f7f7">
      {/* Laundry Request Form*/}
      <Box>
        <Flex gap="10px">
          <FormControl isRequired>
            <FormLabel>Select Pickup Date</FormLabel>
            <Input
              bgColor="whiteAlpha.700"
              onChange={(e) => setForm({ ...form, pickupDate: e.target.value })}
              size="sm"
              type="datetime-local"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Topwear</FormLabel>
            <Input
              bgColor="whiteAlpha.700"
              onChange={(e) => setForm({ ...form, topwears: e.target.value })}
              size="sm"
              placeholder="T-shirt, Top, Shirt"
            />
          </FormControl>
        </Flex>
        <FormControl>
          <FormLabel>Bottomwear</FormLabel>
          <Input
            bgColor="whiteAlpha.700"
            onChange={(e) => setForm({ ...form, bottomwears: e.target.value })}
            size="sm"
            placeholder="Lower, Jeans, Leggings"
          />
        </FormControl>
        <FormControl>
          <FormLabel>Woolen Cloth</FormLabel>
          <Input
            bgColor="whiteAlpha.700"
            onChange={(e) => setForm({ ...form, woolenCloths: e.target.value })}
            size="sm"
            placeholder="Woolen Cloth"
          />
        </FormControl>
        <FormControl>
          <FormLabel>Others</FormLabel>
          <Input
            bgColor="whiteAlpha.700"
            onChange={(e) => setForm({ ...form, others: e.target.value })}
            size="sm"
            placeholder="Others"
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Select Service Type</FormLabel>
          <Select
            bgColor="whiteAlpha.700"
            onChange={(e) => setForm({ ...form, serviceType: e.target.value })}
            placeholder="- - - - - - - -"
          >
            <option value="Fast">Fast Service</option>
            <option value="Regular">Regular Service</option>
          </Select>
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Contact Number</FormLabel>
          <Input
            bgColor="whiteAlpha.700"
            onChange={(e) =>
              setForm({ ...form, contactNumber: e.target.value })
            }
            size="sm"
            type="tel" // changed to 'tel' for contact number validation
            pattern="[0-9]{10}" // for a 10-digit phone number pattern
            placeholder="Contact Number"
          />
        </FormControl>
        <FormControl>
          <FormLabel>Description</FormLabel>
          <Input
            bgColor="whiteAlpha.700"
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            size="sm"
            placeholder="Description (if any)"
          />
        </FormControl>
        <Button onClick={handleSubmit} mt="10px" colorScheme="blue" w="100%">
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default RequestSubmission;
