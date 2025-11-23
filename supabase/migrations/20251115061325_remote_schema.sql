drop extension if exists "pg_net";


  create table "public"."museum" (
    "website" text,
    "street_number" text,
    "address" text,
    "city" text,
    "province" text,
    "region_county" text,
    "postal_code" text,
    "phone" text,
    "mobile" text,
    "email" text,
    "facebook" text,
    "id" uuid not null default gen_random_uuid(),
    "name" text,
    "create_time" timestamp with time zone default (now() AT TIME ZONE 'America/Toronto'::text)
      );


alter table "public"."museum" enable row level security;

CREATE UNIQUE INDEX museum_pkey ON public.museum USING btree (id);

alter table "public"."museum" add constraint "museum_pkey" PRIMARY KEY using index "museum_pkey";

grant delete on table "public"."museum" to "anon";

grant insert on table "public"."museum" to "anon";

grant references on table "public"."museum" to "anon";

grant select on table "public"."museum" to "anon";

grant trigger on table "public"."museum" to "anon";

grant truncate on table "public"."museum" to "anon";

grant update on table "public"."museum" to "anon";

grant delete on table "public"."museum" to "authenticated";

grant insert on table "public"."museum" to "authenticated";

grant references on table "public"."museum" to "authenticated";

grant select on table "public"."museum" to "authenticated";

grant trigger on table "public"."museum" to "authenticated";

grant truncate on table "public"."museum" to "authenticated";

grant update on table "public"."museum" to "authenticated";

grant delete on table "public"."museum" to "service_role";

grant insert on table "public"."museum" to "service_role";

grant references on table "public"."museum" to "service_role";

grant select on table "public"."museum" to "service_role";

grant trigger on table "public"."museum" to "service_role";

grant truncate on table "public"."museum" to "service_role";

grant update on table "public"."museum" to "service_role";


  create policy "Museums are editable by authenticated users"
  on "public"."museum"
  as permissive
  for all
  to authenticated
using (true);



  create policy "Museums are viewable by everyone"
  on "public"."museum"
  as permissive
  for select
  to public
using (true);



