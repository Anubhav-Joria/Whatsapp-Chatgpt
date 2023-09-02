// Importing the necessary modules and dependencies
import Conversation from "../modal/Conversation.js";

// Defining a function to create a new conversation
export const newConversation = async (request, response) => {

  // Extracting senderId and receiverId from the request body
  let senderId = request.body.senderId;
  let receiverId = request.body.receiverId;

  // Checking if a conversation already exists between the sender and receiver
  const exist = await Conversation.findOne({
    members: { $all: [receiverId, senderId] },
  });

  if (exist) {
    // If conversation exists, sending a response indicating that
    response.status(200).json("conversation already exists");
    return;
  }
  // If conversation doesn't exist, creating a new Conversation instance
  const newConversation = new Conversation({
    members: [senderId, receiverId],
  });

  try {
     // Saving the new conversation to the database
    const savedConversation = await newConversation.save();
    response.status(200).json(savedConversation);
  } catch (error) {
    // Handling any errors that occur during the saving process
    response.status(500).json(error);
  }
};
// Defining a function to retrieve a conversation between two users
export const getConversation = async (request, response) => {
  try {
     // Finding a conversation that includes both senderId and receiverId
    const conversation = await Conversation.findOne({
      members: { $all: [request.body.senderId, request.body.receiverId] },
    });
     // Sending the retrieved conversation as a response
    response.status(200).json(conversation);
  } catch (error) {
    // Handling errors that occur during the retrieval process
    response.status(500).json(error);
  }
};
