import Message from "../modal/Message.js";
import Conversation from "../modal/Conversation.js";

// Function to create a new message
export const newMessage = async (request, response) => {

   // Creating a new Message instance using the request body
  const newMessage = new Message(request.body);
  try {
     // Saving the new message to the database
    await newMessage.save();

    // Updating the associated conversation with the new message
    await Conversation.findByIdAndUpdate(request.body.conversationId, {
      message: request.body.text,
    });
    response.status(200).json("Message has been sent successfully");
  } catch (error) {
    response.status(500).json(error);
  }
};

// Function to retrieve messages for a specific conversation
export const getMessage = async (request, response) => {
  try {
    // Finding all messages belonging to the specified conversation
    const messages = await Message.find({ conversationId: request.params.id });

     // Sending the retrieved messages as a response
    response.status(200).json(messages);
  } catch (error) {

     // Handling errors that occur during the retrieval process
    response.status(500).json(error);
  }
};
