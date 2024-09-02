SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

CREATE FUNCTION public.check_near_date(replacement_date date) RETURNS date
    LANGUAGE plpgsql
    AS $$
DECLARE
    nearest_date DATE;
BEGIN
    -- Найти ближайшую дату, которая меньше или равна переданной дате, и сохранить в переменную
    SELECT MAX(timetable_date) INTO nearest_date
    FROM public.timetables
    WHERE timetable_date <= replacement_date;
    
    RETURN nearest_date;
END;
$$;


ALTER FUNCTION public.check_near_date(replacement_date date) OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

CREATE TABLE public.replacements (
    replacement_id integer NOT NULL,
    replacement_date date DEFAULT CURRENT_DATE,
    replacement json NOT NULL,
    group_id integer NOT NULL
);


ALTER TABLE public.replacements OWNER TO postgres;

CREATE TABLE public.student_groups (
    group_id integer NOT NULL,
    id character varying(16) NOT NULL,
    title character varying(64) NOT NULL
);


ALTER TABLE public.student_groups OWNER TO postgres;

CREATE TABLE public.timetables (
    timetable_id integer NOT NULL,
    group_id integer NOT NULL,
    timetable json NOT NULL,
    timetable_date date DEFAULT CURRENT_DATE
);


ALTER TABLE public.timetables OWNER TO postgres;


CREATE VIEW public.data_on_year AS
 SELECT rp.replacement,
    sg.id,
    tb.timetable,
    rp.replacement_date AS date
   FROM ((public.student_groups sg
     JOIN public.replacements rp ON ((sg.group_id = rp.group_id)))
     JOIN public.timetables tb ON ((sg.group_id = tb.group_id)))
  WHERE (tb.timetable_date = public.check_near_date(rp.replacement_date));


ALTER TABLE public.data_on_year OWNER TO postgres;

CREATE SEQUENCE public.replaces_replacement_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.replaces_replacement_id_seq OWNER TO postgres;

ALTER SEQUENCE public.replaces_replacement_id_seq OWNED BY public.replacements.replacement_id;

CREATE SEQUENCE public.student_groups_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.student_groups_id_seq OWNER TO postgres;

ALTER SEQUENCE public.student_groups_id_seq OWNED BY public.student_groups.group_id;

CREATE SEQUENCE public.timetables_timetable_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.timetables_timetable_id_seq OWNER TO postgres;

ALTER SEQUENCE public.timetables_timetable_id_seq OWNED BY public.timetables.timetable_id;

ALTER TABLE ONLY public.replacements ALTER COLUMN replacement_id SET DEFAULT nextval('public.replaces_replacement_id_seq'::regclass);

ALTER TABLE ONLY public.student_groups ALTER COLUMN group_id SET DEFAULT nextval('public.student_groups_id_seq'::regclass);

ALTER TABLE ONLY public.timetables ALTER COLUMN timetable_id SET DEFAULT nextval('public.timetables_timetable_id_seq'::regclass);

ALTER TABLE ONLY public.replacements
    ADD CONSTRAINT replaces_pkey PRIMARY KEY (replacement_id);

ALTER TABLE ONLY public.student_groups
    ADD CONSTRAINT student_groups_pkey PRIMARY KEY (group_id);

ALTER TABLE ONLY public.student_groups
    ADD CONSTRAINT student_groups_text_id_key UNIQUE (id);

ALTER TABLE ONLY public.timetables
    ADD CONSTRAINT timetables_pkey PRIMARY KEY (timetable_id);

ALTER TABLE ONLY public.timetables
    ADD CONSTRAINT fk_group FOREIGN KEY (group_id) REFERENCES public.student_groups(group_id);

ALTER TABLE ONLY public.replacements
    ADD CONSTRAINT fk_group_id FOREIGN KEY (group_id) REFERENCES public.student_groups(group_id);
