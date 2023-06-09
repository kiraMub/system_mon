create table if not exists legal
(
    inn          varchar(12) not null unique,
    date_update  date        not null,
    card         jsonb,
    history      jsonb,
    non_validate varchar(50),
    date_upload  varchar(10)
);

create index date_upload_index on public.legal (date_upload);
create index date_update_index on public.legal (date_update);
