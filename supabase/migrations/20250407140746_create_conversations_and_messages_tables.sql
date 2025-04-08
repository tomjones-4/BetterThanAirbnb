CREATE TABLE conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID NOT NULL,
  user_id_1 UUID NOT NULL,
  user_id_2 UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID NOT NULL,
  sender_id UUID NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  FOREIGN KEY (conversation_id) REFERENCES conversations (id)
);

ALTER TABLE conversations ADD CONSTRAINT conversations_booking_id_fkey FOREIGN KEY (booking_id) REFERENCES bookings (id);
ALTER TABLE conversations ADD CONSTRAINT conversations_user_id_1_fkey FOREIGN KEY (user_id_1) REFERENCES users (id);
ALTER TABLE conversations ADD CONSTRAINT conversations_user_id_2_fkey FOREIGN KEY (user_id_2) REFERENCES users (id);
ALTER TABLE messages ADD CONSTRAINT messages_sender_id_fkey FOREIGN KEY (sender_id) REFERENCES users (id);
