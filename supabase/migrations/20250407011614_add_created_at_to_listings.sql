alter table listings
add column created_at timestamp with time zone default timezone('utc'::text, now());
