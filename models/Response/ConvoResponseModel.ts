export interface ConvoResponseModel {
  _id: string;
  conversation_id: string;
  updated_time: string;
  messages: MessageResponseModel[];
}

export interface MessageResponseModel {
  _id: string;
  created_time: string;
  message: string;
  message_from_email: string;
  message_from_id: string;
  message_from_name: string;
  message_to_id: string;
  message_to_name: string;
}
