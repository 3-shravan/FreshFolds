import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  Text,
  VStack,
  Heading,
} from "@chakra-ui/react";
import React, { useState } from 'react';

const RequestSubmission = () => {
  const [formData, setFormData] = useState({
    pickupDate: '',
    topwears: '',
    bottomwears: '',
    woolenCloths: '',
    others: '',
    serviceType: '',
    contactNumber: '',
    description: '',
  });

  const [responseMessage, setResponseMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false); // Track if the request has been submitted
  const [submissionDate, setSubmissionDate] = useState(null); // Track the date and time of submission

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulate a successful request submission
    const now = new Date().toLocaleString(); // Capture the current date and time of submission
    setSubmissionDate(now);
    setResponseMessage("Your request has been submitted successfully!");
    setIsSubmitted(true);
  };

  const handleReschedule = () => {
    setIsSubmitted(false); // Allow editing of the form again
    setResponseMessage(''); // Clear the message
  };

  return (
    <Box
      maxW="lg"
      mx="auto"
      mt="5rem"
      p="2rem"
      borderWidth="1px"
      borderRadius="md"
      boxShadow="lg"
      bg="white"
      borderColor="gray.200"
    >
      <Heading textAlign="center" mb="6" fontSize="2xl" color="blue.500">
        Laundry Pickup Request
      </Heading>

      {isSubmitted ? (
        <Box textAlign="center">
          <Text fontSize="lg" fontWeight="bold" color="green.500" mb="4">
            {responseMessage}
          </Text>
          <Box textAlign="left" bg="gray.50" p="4" borderRadius="md" mb="4">
            <Text fontSize="md" fontWeight="semibold">Request Details:</Text>
            <Text fontSize="sm"><strong>Submission Date:</strong> {submissionDate}</Text>
            <Text fontSize="sm"><strong>Pickup Date:</strong> {formData.pickupDate}</Text>
            <Text fontSize="sm"><strong>Topwears:</strong> {formData.topwears}</Text>
            <Text fontSize="sm"><strong>Bottomwears:</strong> {formData.bottomwears}</Text>
            <Text fontSize="sm"><strong>Woolen Clothes:</strong> {formData.woolenCloths}</Text>
            <Text fontSize="sm"><strong>Others:</strong> {formData.others}</Text>
            <Text fontSize="sm"><strong>Service Type:</strong> {formData.serviceType}</Text>
            <Text fontSize="sm"><strong>Contact Number:</strong> {formData.contactNumber}</Text>
            <Text fontSize="sm"><strong>Description:</strong> {formData.description || "N/A"}</Text>
          </Box>
          <Button
            mt="6"
            colorScheme="blue"
            onClick={handleReschedule}
            size="lg"
            width="100%"
          >
            Reschedule Pickup
          </Button>
        </Box>
      ) : (
        <form onSubmit={handleSubmit}>
          <VStack spacing="4" align="stretch">
            <FormControl>
              <FormLabel>Pickup Date</FormLabel>
              <Input
                bgColor="gray.50"
                name="pickupDate"
                value={formData.pickupDate}
                onChange={handleChange}
                size="lg"
                type="datetime-local"
                required
                focusBorderColor="blue.500"
              />
            </FormControl>

            <FormControl>
              <FormLabel>Topwears</FormLabel>
              <Input
                bgColor="gray.50"
                name="topwears"
                value={formData.topwears}
                onChange={handleChange}
                size="lg"
                placeholder="Tshirt, Top, Shirt"
                focusBorderColor="blue.500"
              />
            </FormControl>

            <FormControl>
              <FormLabel>Bottomwears</FormLabel>
              <Input
                bgColor="gray.50"
                name="bottomwears"
                value={formData.bottomwears}
                onChange={handleChange}
                size="lg"
                placeholder="Jeans, Pants, Leggings"
                focusBorderColor="blue.500"
              />
            </FormControl>

            <FormControl>
              <FormLabel>Woolen Clothes</FormLabel>
              <Input
                bgColor="gray.50"
                name="woolenCloths"
                value={formData.woolenCloths}
                onChange={handleChange}
                size="lg"
                placeholder="Sweater, Jacket"
                focusBorderColor="blue.500"
              />
            </FormControl>

            <FormControl>
              <FormLabel>Others</FormLabel>
              <Input
                bgColor="gray.50"
                name="others"
                value={formData.others}
                onChange={handleChange}
                size="lg"
                placeholder="Other items"
                focusBorderColor="blue.500"
              />
            </FormControl>

            <FormControl>
              <FormLabel>Service Type</FormLabel>
              <Select
                bgColor="gray.50"
                name="serviceType"
                value={formData.serviceType}
                onChange={handleChange}
                placeholder="Select Service Type"
                size="lg"
                focusBorderColor="blue.500"
              >
                <option value="Fast">Fast Service</option>
                <option value="Regular">Regular Service</option>
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel>Contact Number</FormLabel>
              <Input
                bgColor="gray.50"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                size="lg"
                type="tel"
                placeholder="Contact Number"
                focusBorderColor="blue.500"
                required
              />
            </FormControl>

            <FormControl>
              <FormLabel>Description</FormLabel>
              <Input
                bgColor="gray.50"
                name="description"
                value={formData.description}
                onChange={handleChange}
                size="lg"
                placeholder="Any additional details"
                focusBorderColor="blue.500"
              />
            </FormControl>

            <Button
              type="submit"
              colorScheme="blue"
              size="lg"
              mt="4"
              width="100%"
            >
              Submit Request
            </Button>
          </VStack>
        </form>
      )}

      {responseMessage && !isSubmitted && (
        <Text mt="4" color="red.500" fontSize="md">
          {responseMessage}
        </Text>
      )}
    </Box>
  );
};

export default RequestSubmission;
