--
-- PostgreSQL database dump
--

-- Dumped from database version 17.2
-- Dumped by pg_dump version 17.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: products; Type: TABLE; Schema: public; Owner: product_db_owner
--

CREATE TABLE public.products (
    id bigint NOT NULL,
    title text NOT NULL,
    tags text[],
    sku text NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


ALTER TABLE public.products OWNER TO product_db_owner;

--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: product_db_owner
--

COPY public.products (id, title, tags, sku, created_at, updated_at) FROM stdin;
9505912586529	The Compare at Price Snowboard, Medium, The Compare at Price Snowboard, Large	{"Accessory, Sport, Winter"}	med-2, lar-2	2024-06-28 05:31:01	2024-07-28 20:15:18
9505912324385	The Complete Snowboard, Ice, The Complete Snowboard, Dawn, The Complete Snowboard, Powder, The Complete Snowboard, Electric, The Complete Snowboard, Sunset	{"Premium, Snow, Snowboard, Sport, Winter"}	comp-1, comp-2, comp-3, comp-4, comp-5	2024-06-28 05:31:00	2024-06-28 05:31:06
9505912422689	The Draft Snowboard, Default Title	{""}	draft-1	2024-06-28 05:31:00	2024-06-28 05:31:07
9505912357153	The Hidden Snowboard, Default Title	{"Premium, Snow, Snowboard, Sport, Winter"}	hide-2	2024-06-28 05:31:00	2024-06-28 05:31:06
1231231231231	Product 2, Variant 2, Product 2, Variant 3	{"tag23, tag23"}	SKU004, SKU005	2025-10-01 10:00:00	2025-10-20 10:00:00
\.


--
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: product_db_owner
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: public; Owner: cloud_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE cloud_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO neon_superuser WITH GRANT OPTION;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: cloud_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE cloud_admin IN SCHEMA public GRANT ALL ON TABLES TO neon_superuser WITH GRANT OPTION;


--
-- PostgreSQL database dump complete
--

