--
-- PostgreSQL database dump
--

-- Dumped from database version 14.1
-- Dumped by pg_dump version 14.1

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: categories; Type: TABLE; Schema: public; Owner: sejungkim
--

CREATE TABLE public.categories (
    name text NOT NULL,
    parent_category_id integer,
    category_id integer NOT NULL
);


ALTER TABLE public.categories OWNER TO sejungkim;

--
-- Name: categories_new_id_seq; Type: SEQUENCE; Schema: public; Owner: sejungkim
--

CREATE SEQUENCE public.categories_new_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.categories_new_id_seq OWNER TO sejungkim;

--
-- Name: categories_new_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: sejungkim
--

ALTER SEQUENCE public.categories_new_id_seq OWNED BY public.categories.category_id;


--
-- Name: customers; Type: TABLE; Schema: public; Owner: sejungkim
--

CREATE TABLE public.customers (
    id integer NOT NULL,
    first_name text NOT NULL,
    last_name text NOT NULL,
    phone_number text NOT NULL
);


ALTER TABLE public.customers OWNER TO sejungkim;

--
-- Name: customers_id_seq; Type: SEQUENCE; Schema: public; Owner: sejungkim
--

CREATE SEQUENCE public.customers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.customers_id_seq OWNER TO sejungkim;

--
-- Name: customers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: sejungkim
--

ALTER SEQUENCE public.customers_id_seq OWNED BY public.customers.id;


--
-- Name: menu_items; Type: TABLE; Schema: public; Owner: sejungkim
--

CREATE TABLE public.menu_items (
    id integer NOT NULL,
    name text NOT NULL,
    description text,
    base_price numeric(10,2) NOT NULL,
    category_id integer,
    exclusions text,
    is_deleted boolean DEFAULT false
);


ALTER TABLE public.menu_items OWNER TO sejungkim;

--
-- Name: menu_items_id_seq; Type: SEQUENCE; Schema: public; Owner: sejungkim
--

CREATE SEQUENCE public.menu_items_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.menu_items_id_seq OWNER TO sejungkim;

--
-- Name: menu_items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: sejungkim
--

ALTER SEQUENCE public.menu_items_id_seq OWNED BY public.menu_items.id;


--
-- Name: menuitems_optiongroups; Type: TABLE; Schema: public; Owner: sejungkim
--

CREATE TABLE public.menuitems_optiongroups (
    id integer NOT NULL,
    menu_item_id integer,
    option_group_id integer
);


ALTER TABLE public.menuitems_optiongroups OWNER TO sejungkim;

--
-- Name: menuitems_optiongroups_id_seq; Type: SEQUENCE; Schema: public; Owner: sejungkim
--

CREATE SEQUENCE public.menuitems_optiongroups_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.menuitems_optiongroups_id_seq OWNER TO sejungkim;

--
-- Name: menuitems_optiongroups_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: sejungkim
--

ALTER SEQUENCE public.menuitems_optiongroups_id_seq OWNED BY public.menuitems_optiongroups.id;


--
-- Name: option_groups; Type: TABLE; Schema: public; Owner: sejungkim
--

CREATE TABLE public.option_groups (
    id integer NOT NULL,
    name text NOT NULL,
    display_text text NOT NULL,
    allow_multiple boolean NOT NULL,
    required boolean NOT NULL,
    free_option_limit integer,
    is_deleted boolean DEFAULT false
);


ALTER TABLE public.option_groups OWNER TO sejungkim;

--
-- Name: option_groups_id_seq; Type: SEQUENCE; Schema: public; Owner: sejungkim
--

CREATE SEQUENCE public.option_groups_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.option_groups_id_seq OWNER TO sejungkim;

--
-- Name: option_groups_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: sejungkim
--

ALTER SEQUENCE public.option_groups_id_seq OWNED BY public.option_groups.id;


--
-- Name: options; Type: TABLE; Schema: public; Owner: sejungkim
--

CREATE TABLE public.options (
    id integer NOT NULL,
    name text NOT NULL,
    additional_price numeric NOT NULL,
    option_group_id integer
);


ALTER TABLE public.options OWNER TO sejungkim;

--
-- Name: options_id_seq; Type: SEQUENCE; Schema: public; Owner: sejungkim
--

CREATE SEQUENCE public.options_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.options_id_seq OWNER TO sejungkim;

--
-- Name: options_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: sejungkim
--

ALTER SEQUENCE public.options_id_seq OWNED BY public.options.id;


--
-- Name: order_items; Type: TABLE; Schema: public; Owner: sejungkim
--

CREATE TABLE public.order_items (
    id integer NOT NULL,
    order_id integer,
    quantity integer NOT NULL,
    item_price numeric NOT NULL,
    item_name character varying(255)
);


ALTER TABLE public.order_items OWNER TO sejungkim;

--
-- Name: order_menu_items_id_seq; Type: SEQUENCE; Schema: public; Owner: sejungkim
--

CREATE SEQUENCE public.order_menu_items_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.order_menu_items_id_seq OWNER TO sejungkim;

--
-- Name: order_menu_items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: sejungkim
--

ALTER SEQUENCE public.order_menu_items_id_seq OWNED BY public.order_items.id;


--
-- Name: order_status; Type: TABLE; Schema: public; Owner: sejungkim
--

CREATE TABLE public.order_status (
    id integer NOT NULL,
    status_name text NOT NULL,
    description text,
    color_code character varying(7),
    display_order integer
);


ALTER TABLE public.order_status OWNER TO sejungkim;

--
-- Name: order_status_id_seq; Type: SEQUENCE; Schema: public; Owner: sejungkim
--

CREATE SEQUENCE public.order_status_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.order_status_id_seq OWNER TO sejungkim;

--
-- Name: order_status_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: sejungkim
--

ALTER SEQUENCE public.order_status_id_seq OWNED BY public.order_status.id;


--
-- Name: orders; Type: TABLE; Schema: public; Owner: sejungkim
--

CREATE TABLE public.orders (
    id integer NOT NULL,
    customer_name text NOT NULL,
    total_amount numeric NOT NULL,
    order_date text NOT NULL,
    pickup_time text NOT NULL,
    pickup_date text NOT NULL,
    payment_method character varying(255),
    taxes_amount numeric(10,2),
    tip_amount numeric(10,2),
    phone_number character varying(20),
    order_time text,
    status_id integer,
    subtotal_amount numeric(10,2)
);


ALTER TABLE public.orders OWNER TO sejungkim;

--
-- Name: orders_id_seq; Type: SEQUENCE; Schema: public; Owner: sejungkim
--

CREATE SEQUENCE public.orders_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.orders_id_seq OWNER TO sejungkim;

--
-- Name: orders_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: sejungkim
--

ALTER SEQUENCE public.orders_id_seq OWNED BY public.orders.id;


--
-- Name: categories category_id; Type: DEFAULT; Schema: public; Owner: sejungkim
--

ALTER TABLE ONLY public.categories ALTER COLUMN category_id SET DEFAULT nextval('public.categories_new_id_seq'::regclass);


--
-- Name: customers id; Type: DEFAULT; Schema: public; Owner: sejungkim
--

ALTER TABLE ONLY public.customers ALTER COLUMN id SET DEFAULT nextval('public.customers_id_seq'::regclass);


--
-- Name: menu_items id; Type: DEFAULT; Schema: public; Owner: sejungkim
--

ALTER TABLE ONLY public.menu_items ALTER COLUMN id SET DEFAULT nextval('public.menu_items_id_seq'::regclass);


--
-- Name: menuitems_optiongroups id; Type: DEFAULT; Schema: public; Owner: sejungkim
--

ALTER TABLE ONLY public.menuitems_optiongroups ALTER COLUMN id SET DEFAULT nextval('public.menuitems_optiongroups_id_seq'::regclass);


--
-- Name: option_groups id; Type: DEFAULT; Schema: public; Owner: sejungkim
--

ALTER TABLE ONLY public.option_groups ALTER COLUMN id SET DEFAULT nextval('public.option_groups_id_seq'::regclass);


--
-- Name: options id; Type: DEFAULT; Schema: public; Owner: sejungkim
--

ALTER TABLE ONLY public.options ALTER COLUMN id SET DEFAULT nextval('public.options_id_seq'::regclass);


--
-- Name: order_items id; Type: DEFAULT; Schema: public; Owner: sejungkim
--

ALTER TABLE ONLY public.order_items ALTER COLUMN id SET DEFAULT nextval('public.order_menu_items_id_seq'::regclass);


--
-- Name: order_status id; Type: DEFAULT; Schema: public; Owner: sejungkim
--

ALTER TABLE ONLY public.order_status ALTER COLUMN id SET DEFAULT nextval('public.order_status_id_seq'::regclass);


--
-- Name: orders id; Type: DEFAULT; Schema: public; Owner: sejungkim
--

ALTER TABLE ONLY public.orders ALTER COLUMN id SET DEFAULT nextval('public.orders_id_seq'::regclass);


--
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: sejungkim
--

COPY public.categories (name, parent_category_id, category_id) FROM stdin;
Breakfast	\N	1
Lunch	\N	2
Breakfast Sandwich	1	3
Breakfast Burritos	1	4
Breakfast Egg Platters	1	5
Breakfast Omelets	1	6
French Toast, Pancakes, and More	1	7
Subs	2	8
Salad & Wraps	2	9
Sandwiches	2	10
Clubs/Gyro	2	11
Burgers	2	12
Rice Bowls & Stir Fry	2	13
Sides	2	14
\.


--
-- Data for Name: customers; Type: TABLE DATA; Schema: public; Owner: sejungkim
--

COPY public.customers (id, first_name, last_name, phone_number) FROM stdin;
\.


--
-- Data for Name: menu_items; Type: TABLE DATA; Schema: public; Owner: sejungkim
--

COPY public.menu_items (id, name, description, base_price, category_id, exclusions, is_deleted) FROM stdin;
1	DIY Breakfast Egg Sandwich	2 eggs, with your choice of cheese, meat, and your choice of bread.	2.49	3	\N	f
2	DIY Bagel Breakfast Sandwich	2 eggs, with your choice of cheese and meat on a toasted plain bagel.	3.49	3	\N	f
3	DIY Croissant Breakfast Sandwich	2 eggs, with your choice of cheese and meat on a toasted croissant.	3.49	3	\N	f
4	Bagel with Cream Cheese	Bagel with cream cheese.	2.50	3	\N	f
5	Plain Croissant	Plain croissant.	1.29	7	\N	f
6	Pancakes (3 pieces)	Homemade buttermilk pancakes.	3.99	7	\N	f
7	French Toast (3 pieces)	Homemade french toast.	3.99	7	\N	f
8	Home Fries Side	A side of freshly made golden brown home fries.	3.99	7	\N	f
9	DIY Original Breakfast Burrito	2 eggs, cheese, and your choice of protein wrapped in a large flour tortilla.	4.99	4	\N	f
10	Country Burrito	2 eggs, sausage, home fries, and american cheese wrapped in a large flour tortilla.	5.49	4	Home Fries, Cheese	f
11	Beef Country Burrito	2 eggs, grilled shaved rib eye, grilled onion, home fries, and american cheese wrapped in a large flour tortilla.	5.99	4	Grilled Onion, Home Fries, Cheese	f
12	Turkey & Cheese Burrito	2 eggs, turkey, mushroom, grilled onion, and american cheese wrapped in a large flour tortilla.	5.49	4	Mushroom, Grilled Onion, Cheese	f
13	Two Eggs Platter	2 eggs served with home fries and 2 slices of your choice of toast.	4.99	5	Home Fries, Toast	f
14	DIY Two Eggs & Meat Platter	2 eggs and your choice of protein served with home fries and 2 slices of toast.	5.99	5	Home Fries, Toast	f
15	Cheese Omelet	Cheese omelet served with home fries and 2 slices of your choice of toast.	4.99	6	Cheese	f
16	DIY Breakfast Cheese & Meat Omelet	Egg omelet with cheese and your choice of protein served with a side of home fries and 2 slices of toast.	5.99	6	\N	f
17	Vegetable Omelet	Egg omelet with cheese, green bell pepper, onion, tomato, and mushroom served with a side of home fries and 2 slices of toast.	5.99	6	Green Bell Pepper, Onion, Tomato, Mushroom, Cheese	f
18	Western Omelet	Egg omelet with ham, cheese, green bell pepper, onion, tomato, and mushroom served with a side of home fries and 2 slices of toast.	6.99	6	Ham, Green Bell Pepper, Onion, Tomato, Mushroom, Cheese	f
19	Steak & Cheese Omelet	Egg omelet with grilled shaved rib eye, cheese, and onion served with a side of home fries and 2 slices of toast.	6.99	6	Rib Eye, Cheese, Onion	f
22	Roast Beef Sub	Roast beef, provolone cheese, lettuce, tomato, onion, and mayo served on a 8" or 12" white sub.	7.99	8	Roast Beef, Provolone Cheese, Lettuce, Tomato, Onion, Mayo	f
23	Turkey & Provolone Sub	Turkey, provolone cheese, lettuce, tomato, onion, and mayo served on a 8" or 12" white sub.	7.99	8	Turkey, Provolone Cheese, Lettuce, Tomato, Onion, Mayo	f
24	Ham & Cheese Sub	Ham, provolone cheese, lettuce, tomato, onion, and mayo served on a 8" or 12" white sub.	7.99	8	Ham, Provolone Cheese, Lettuce, Tomato, Onion, Mayo	f
25	Veggie Sub	Provolone cheese, american cheese, swiss cheese, lettuce, tomato, onion, green bell pepper, carrot, cucumber, mushroom, and mayo served on a 8" or 12" white sub.	7.99	8	Provolone Cheese, American Cheese, Swiss Cheese, Lettuce, Tomato, Onion, Green Bell Pepper, Carrot, Cucumber, Mushroom, Mayo	f
26	New Yorker Sub	Corned beef, pastrami, swiss cheese, lettuce, tomato, onion, and spicy mustard served on a 8" or 12" white sub.	7.99	8	Corned Beef, Pastrami, Swiss Cheese, Lettuce, Tomato, Onion, Spicy Mustard	f
27	Steak & Cheese Sub	Grilled Shaved Rib Eye, provolone cheese, lettuce, tomato, grilled onion, and mayo served on a 8" or 12" white sub.	7.99	8	Rib Eye, Provolone Cheese, Lettuce, Tomato, Grilled Onion, Mayo	f
28	Grilled Chicken & Cheese Sub	Grilled Chicken Breast, provolone cheese, lettuce, tomato, grilled onion, and mayo served on a 8" or 12" white sub.	7.99	8	Chicken, Provolone Cheese, Lettuce, Tomato, Grilled Onion, Mayo	f
29	Teriyaki Steak & Cheese Sub	Teriyaki glazed grilled shaved rib eye, provolone cheese, lettuce, tomato, grilled onion, and mayo served on a 8" or 12" white sub.	7.99	8	Rib Eye, Provolone Cheese, Lettuce, Tomato, Grilled Onion, Mayo	f
30	Teriyaki Chicken & Cheese Sub	Teriyaki glazed grilled chicken, provolone cheese, lettuce, tomato, grilled onion, and mayo served on a 8" or 12" white sub.	7.99	8	Chicken, Provolone Cheese, Lettuce, Tomato, Grilled Onion, Mayo	f
31	Korean Beef Bulgogi Sub	Marinated korean beef bulgogi in soy sauce, provolone cheese, lettuce, tomato, and mayo served on a 8" or 12" white sub.	7.99	8	Beef Bulgogi, Provolone Cheese, Lettuce, Tomato, Mayo	f
32	California Chicken Sub	Grilled chicken breast marinated in italian dressing, provolone cheese, lettuce, tomato, grilled onion, and mayo served on a 8" or 12" white sub.	7.99	8	Chicken, Provolone Cheese, Lettuce, Tomato, Grilled Onion, Mayo	f
33	Fried Fish Sub	Fried breaded whiting fish, american cheese, lettuce, tomato, onion, and tartar sauce served on a 8" or 12" white sub.	7.99	8	Fried Fish, American Cheese, Lettuce, Tomato, Onion, Tartar Sauce	f
34	Royal Chicken Sub	Grilled chicken, provolone cheese, lettuce, tomato, onion, green bell pepper jalapeno pepper, crushed pepper paste, and mayo served on a 8" or 12" white sub.	8.99	8	Chicken, Provolone Cheese, Lettuce, Tomato, Onion, Green Bell Pepper Jalapeno Pepper, Crushed Pepper Paste, Mayo	f
36	Super B.L.T Sub	Double bacon, lettuce, tomato, and mayo served on a 8" or 12" white sub.	8.99	8	Bacon, Lettuce, Tomato, Mayo	f
35	Cheeseburger Sub	Ground beef patties, american cheese, lettuce, tomato, onion, pickle, ketchup, mustard, and mayo served on a 8" or 12" white sub.	8.99	8	Beef Patties, American Cheese, Lettuce, Tomato, Onion, Pickle, Ketchup, Mustard, Mayo	f
38	Chicken Caesar Wrap	Grilled chicken marinated in italian dressing, mozzarella cheese, lettuce, tomato, and caesar dressing wrapped in a large flour tortilla.	7.99	9	Chicken, Mozzarella Cheese, Lettuce, Tomato, Caesar Dressing	f
39	California Turkey Wrap	Turkey, mozzarella cheese, lettuce, tomato, avocado, cucumber, and honey mustard wrapped in a large flour tortilla.	7.99	9	Turkey, Mozzarella Cheese, Lettuce, Tomato, Avocado, Cucumber, Honey Mustard	f
20	Dad’s Special Sub (Italian Sub)	Ham, salami, pepperoni, capicola, provolone cheese, lettuce, tomato, onion, and mayo served on a 8" or 12" white sub.	7.99	8	Ham, Salami, Pepperoni, Capicola, Provolone Cheese, Lettuce, Tomato, Onion, Mayo	f
37	Build Your Own Sub	Choose your own protein, toppings, and dressing served on a 8" or 12" white sub.	8.99	8	\N	t
40	Turkey Cusabi Wrap	Turkey, mozzarella cheese, lettuce, tomato, avocado, and cusabi dressing wrapped in a large flour tortilla.	7.99	9	Turkey, Mozzarella Cheese, Lettuce, Tomato, Avocado, Cusabi Dressing	f
41	Tuna Wrap	Tuna salad, mozzarella cheese, lettuce, tomato, and cucumber wrapped in a large flour tortilla.	7.99	9	Tuna Salad, Mozzarella Cheese, Lettuce, Tomato, Cucumber	f
44	Classic B.L.T Sandwich	Bacon, lettuce, tomato, and mayo on your choice of bread.	6.99	10	Bacon, Lettuce, Tomato, Mayo	f
45	Tuna Salad Sandwich	Tuna salad, lettuce, tomato, and mayo on your choice of bread.	6.99	10	Tuna Salad, Lettuce, Tomato, Mayo	f
46	Reuben Sandwich	Grilled shaved corned beef, swiss cheese, and sauerkraut on rye.	6.99	10	Corned Beef, Swiss Cheese, Sauerkraut	f
47	BBQ Chicken Sandwich	Barbecue chicken and cole slaw on a sesame bun.	6.99	10	Chicken, Cole Slaw	f
48	Grilled Cheese Sandwich	Sliced american cheese grilled on your choice of bread.	4.99	10	\N	f
49	Grilled Ham & Cheese Sandwich	Sliced american cheese and ham grilled on your choice of bread.	5.99	10	\N	f
50	Combo Club	Roast beef, turkey, ham, bacon, american cheese, lettuce, tomato, and mayo on your choice of bread.	8.49	11	Roast Beef, Turkey, Ham, Bacon, American Cheese, Lettuce, Tomato, Mayo	f
51	Ham & Turkey Club	Turkey, ham, bacon, american cheese, lettuce, tomato, and mayo on your choice of bread.	7.99	11	Turkey, Ham, Bacon, American Cheese, Lettuce, Tomato, Mayo	f
52	Gyro	Beef, lamb, lettuce, tomato, onion, and cucumber sauce wrapped in pita bread.	7.99	11	Meat, Lettuce, Tomato, Onion, Cucumber Sauce	f
53	Fried Chicken Burger	Fried chicken patty, american cheese, lettuce, tomato, onion, and mayo on a sesame bun.	6.99	12	American Cheese, Lettuce, Tomato, Onion, Mayo	f
54	Classic Cheeseburger	Ground beef patty, american cheese, lettuce, tomato, onion, pickle, ketchup, mustard, and mayo on a sesame bun.	6.99	12	Beef Patty, American Cheese, Lettuce, Tomato, Onion, Pickle, Ketchup, Mustard, Mayo	f
55	Bacon Cheeseburger	Ground beef patty, bacon, american cheese, lettuce, tomato, onion, pickle, ketchup, mustard, and mayo on a sesame bun.	7.99	12	Beef Patty, Bacon, American Cheese, Lettuce, Tomato, Onion, Pickle, Ketchup, Mustard, Mayo	f
56	Korean Beef Bulgogi Stir Fry	Grilled marinated korean beef bulgogi in soy sauce with sautéed onions served with a side of steamed rice and salad.	10.99	13	Beef Bulgogi, Onions, Rice, Salad	f
57	Teriyaki Stir Fry	Grilled teriyaki chicken with sautéed onions, carrot, and green bell pepper served with a side of steamed rice and salad.	10.99	13	Chicken, Onions, Carrot, Green Bell Pepper, Rice, Salad	f
58	Spicy Chicken Stir Fry	Grilled spicy chicken with sautéed onions, carrot, and green bell pepper served with a side of steamed rice and salad.	10.99	13	Chicken, Onions, Carrot, Green Bell Pepper, Rice, Salad	f
59	Chicken Taco Rice Bowl	Grilled chicken, shredded lettuce, tomato, black beans, salsa, pico de gallo, sour cream, and cheddar cheese over white rice.	9.99	13	Chicken, Lettuce, Tomato, Black Beans, Salsa, Pico de Gallo, Sour Cream, Cheddar Cheese, Rice	f
60	Korean Beef Bulgogi Taco Rice Bowl	Korean Beef bulgogi, sautéed onions, shredded lettuce, tomato, black beans, and cheddar cheese over white rice and topped with an over easy egg.	9.99	13	Beef Bulgogi, Onions, Lettuce, Tomato, Black Beans, Cheddar Cheese, Rice, Egg	f
61	Korean Bibimbap Bowl	Korean Beef bulgogi, sautéed squash, carrot, bean sprouts, cucumber, and shredded lettuce over white rice and topped with an over easy egg.	9.99	13	Beef Bulgogi, Squash, Carrot, Bean Sprouts, Cucumber, Lettuce, Rice, Egg	f
62	Chicken Curry	Chicken curry with onion, carrot, green bell pepper, and potato, served over white rice.	10.99	13	\N	f
63	French Fries		2.99	14	\N	f
64	Coleslaw		2.29	14	\N	f
65	Potato Salad		2.99	14	\N	f
66	Onion Rings		3.99	14	\N	f
67	Chicken Nuggets		3.99	14	\N	f
68	Chicken Noodle Soup		2.99	14	\N	f
21	Mom’s Special Sub	Turkey, roast beef, bacon, provolone cheese, lettuce, tomato, onion, and mayo served on a 8" or 12" white sub.	7.99	8	Turkey, Roast Beef, Bacon, Provolone Cheese, Lettuce, Tomato, Onion, Mayo	f
42	Build Your Own Wrap	Choose your own protein, toppings, and dressing wrapped in a large flour tortilla.	7.99	9	\N	t
43	Build Your Own Salad	Choose your own protein, toppings, and dressing on a bed of salad greens.	8.99	9	\N	t
\.


--
-- Data for Name: menuitems_optiongroups; Type: TABLE DATA; Schema: public; Owner: sejungkim
--

COPY public.menuitems_optiongroups (id, menu_item_id, option_group_id) FROM stdin;
1	4	\N
2	5	\N
3	6	\N
4	7	\N
5	8	\N
6	1	1
7	1	2
8	1	3
9	1	4
10	1	5
11	2	1
12	2	2
13	2	3
14	2	4
15	2	5
16	3	1
17	3	2
18	3	3
19	3	4
20	3	5
21	9	2
22	9	3
23	9	4
24	9	5
25	10	4
26	10	5
27	11	4
28	11	5
29	12	4
35	12	5
36	13	1
37	14	1
38	14	2
39	14	3
40	15	1
41	15	5
42	16	1
43	16	2
44	16	3
45	16	5
46	17	1
47	17	5
48	18	1
49	18	5
50	19	1
51	19	5
52	20	10
53	20	14
54	20	19
55	20	20
56	20	21
57	21	10
58	21	14
59	21	19
60	21	20
61	21	21
62	22	10
63	22	14
64	22	20
65	22	21
66	23	10
67	23	14
68	23	20
69	23	21
70	24	10
71	24	14
72	24	20
73	24	21
74	25	10
165	25	14
166	25	20
167	25	21
168	26	10
169	26	14
170	26	20
171	26	21
172	27	10
173	27	14
174	27	20
175	27	21
176	27	22
177	28	10
178	28	14
179	28	20
180	28	21
181	28	22
182	29	10
183	29	14
184	29	20
185	29	21
186	29	22
187	30	10
188	30	14
189	30	20
190	30	21
191	31	10
192	31	14
193	31	20
194	31	21
195	32	10
196	32	14
197	32	20
198	32	21
199	33	10
200	33	14
201	33	20
202	33	21
203	34	10
204	34	14
205	34	20
206	34	21
207	35	10
208	35	14
209	35	20
210	35	21
211	36	10
212	36	14
213	36	20
214	36	21
215	37	6
217	37	8
218	37	9
219	37	10
220	37	14
221	37	19
222	37	20
223	37	21
224	38	10
225	38	20
226	38	21
227	39	10
228	39	20
229	39	21
230	40	10
231	40	20
232	40	21
233	41	10
234	41	20
235	41	21
236	42	11
237	42	12
238	42	13
239	42	20
240	42	21
241	43	10
242	43	20
243	43	21
244	44	10
245	44	18
246	44	20
247	44	21
248	45	10
249	45	20
250	45	21
251	46	10
252	46	20
253	46	21
254	47	1
255	47	10
256	47	20
257	47	21
258	48	1
259	48	10
260	48	20
261	48	21
262	49	1
263	49	10
264	49	18
265	49	20
266	49	21
267	50	1
268	50	10
269	50	20
270	50	21
271	51	20
272	51	21
273	52	10
274	52	20
275	52	21
276	53	10
277	53	20
278	53	21
279	54	10
280	54	20
281	54	21
282	55	14
283	55	15
284	56	14
285	56	15
286	57	14
287	57	15
288	58	14
289	58	16
290	59	14
291	59	16
292	60	14
293	60	16
294	61	14
295	61	17
296	62	\N
297	63	\N
298	64	\N
299	65	\N
300	66	\N
302	14	23
303	13	23
216	37	7
301	42	7
\.


--
-- Data for Name: option_groups; Type: TABLE DATA; Schema: public; Owner: sejungkim
--

COPY public.option_groups (id, name, display_text, allow_multiple, required, free_option_limit, is_deleted) FROM stdin;
1	bread_option	Choose Your Bread	f	t	\N	f
2	breakfast_meats	Choose Your Protein	f	f	\N	f
3	breakfast_cheese	Add Cheese	f	f	\N	f
4	homefries_toast	Add HomeFries and Toast	t	f	\N	f
5	breakfast_mods	Extra Add Ons	f	f	\N	f
6	sub_meats	Choose Your Protein	t	f	1	f
7	sub_cheeses	Choose Your Cheese	t	f	1	f
8	sub_toppings	Choose Your Toppings	t	f	5	f
9	sub_dressing	Choose Your Dressing	t	f	2	f
10	sub_mods	Extra Add Ons	t	f	\N	f
11	salad_meats	Choose Your Protein	t	f	1	f
12	salad_toppings	Choose Your Toppings	t	f	3	f
13	salad_dressing	Choose Your Dressing	f	f	\N	f
14	size	Choose a Size	f	t	\N	f
15	stir-fry_mods	Extra Add Ons	t	f	\N	f
16	rice-bowl_mods	Extra Add Ons	t	f	\N	f
17	curry_mods	Extra Add Ons	t	f	\N	f
18	toasted	Would You Like Your Bread Toasted?	f	t	\N	f
19	hot_cold	Hot or Cold Sub?	f	t	\N	f
22	deluxe_sub	Make it a deluxe	f	f	\N	f
23	egg_option	How do you like your eggs?	f	t	\N	f
24	free_cheese	Choose Your Cheese	f	t	\N	f
20	combo_side	Make it a Combo	f	f	\N	f
21	combo_drink	Add a Drink	f	f	\N	t
\.


--
-- Data for Name: options; Type: TABLE DATA; Schema: public; Owner: sejungkim
--

COPY public.options (id, name, additional_price, option_group_id) FROM stdin;
1	White	0.00	1
2	Wheat	0.00	1
3	Sourdough	0.00	1
4	Rye	0.00	1
5	Sausage	1.50	2
6	Ham	1.50	2
7	Turkey	1.50	2
8	Scrapple	1.50	2
9	Bacon	1.50	2
10	Chorizo	1.50	2
11	Chicken	1.50	2
12	Steak	1.50	2
13	Add Cheese	0.50	3
14	Add a Side of Home Fries	3.99	4
15	Add a Side of White Toast	1.00	4
16	Add a Side of Wheat Toast	1.00	4
17	Add a Side of Rye Toast	1.00	4
18	Add a Side of Sourdough Toast	1.00	4
19	Add Extra Meat	1.00	5
20	Add Extra Cheese	0.50	5
21	Add an Extra Egg	0.80	5
22	Grilled Rib Eye	1.50	6
23	Roast Beef	1.50	6
24	Beef Bulgogi	1.50	6
25	Sliced Turkey	1.50	6
26	Sliced Ham	1.50	6
27	Grilled Chicken	1.50	6
28	Bacon	1.50	6
29	Pepperoni	1.50	6
30	Tuna Salad	1.50	6
31	Fried Fish	1.50	6
32	Beef Hamburger Patties	1.50	6
33	Pastrami	1.50	6
34	Capicola	1.50	6
35	Corned Beef	1.50	6
36	Salami	1.50	6
41	Lettuce	0.50	8
42	Tomato	0.50	8
43	Cucumber	0.50	8
44	Mushroom	0.50	8
45	Sliced Raw Onion	0.50	8
46	Green Bell Pepper	0.50	8
47	Avocado	0.50	8
48	Carrot	0.50	8
49	Grilled Onion	0.50	8
50	Pickle	0.50	8
51	Olives	0.50	8
52	Pickled Jalapeno	0.50	8
53	Cole Slaw	0.50	8
54	Sauerkraut	0.50	8
55	Ketchup	0.00	9
56	Mayo	0.00	9
57	Spicy Mustard	0.00	9
58	Mustard	0.00	9
59	Honey Mustard	0.00	9
60	Tartar Sauce	0.00	9
61	Cusabi Dressing	0.00	9
62	Caesar Dressing	0.00	9
63	Add Double Meat	1.50	10
64	Add Extra Cheese	1.00	10
65	Grilled Rib Eye	1.50	11
66	Roast Beef	1.50	11
67	Beef Bulgogi	1.50	11
68	Grilled Spicy Chicken	1.50	11
69	Teriyaki Chicken	1.50	11
70	Grilled Chicken	1.50	11
71	Bacon	1.50	11
72	Tomato	0.50	12
73	Cucumber	0.50	12
74	Mushroom	0.50	12
75	Sliced Raw Onion	0.50	12
76	Green Bell Pepper	0.50	12
77	Avocado	0.50	12
78	Sliced Carrot	0.50	12
79	Pickle	0.50	12
80	Pickled Jalapeno	0.50	12
81	Cheddar Cheese	0.50	12
82	Black Beans	0.50	12
83	Ranch	0.00	13
84	Caesar Dressing	0.00	13
85	Medium	0.00	14
86	Large	2.00	14
87	Add Double Meat	2.00	15
88	Add Double Rice	3.99	15
89	Add Double Salad	3.99	15
90	Add Double Meat	2.00	16
91	Add Double Rice	3.99	16
92	Add Extra Lettuce	0.50	16
93	Add Extra Cheese	0.50	16
94	Add Egg	0.80	16
95	Add Double Rice	3.99	17
96	Toasted	0.00	18
97	Not Toasted	0.00	18
98	Hot	0.00	19
99	Cold	0.00	19
106	Fountain Drink	1.50	21
107	Bottled Soda	1.50	21
108	Add Green Peppers & Mushrooms	0.75	22
118	Over Easy	0.00	23
119	Over Medium	0.00	23
120	Over Hard	0.00	23
121	Scrambled	0.00	23
37	Swiss	0.50	7
38	American	0.50	7
39	Provolone	0.50	7
40	Mozzarella Cheese	0.50	7
122	Swiss	0.00	24
123	American	0.00	24
124	Provolone	0.00	24
125	Mozzarella Cheese	0.00	24
100	Fries	3.00	20
101	Onion Rings	3.00	20
102	Potato Salad	3.00	20
103	Chips	3.00	20
104	Side Salad	3.00	20
105	Coleslaw	3.00	20
\.


--
-- Data for Name: order_items; Type: TABLE DATA; Schema: public; Owner: sejungkim
--

COPY public.order_items (id, order_id, quantity, item_price, item_name) FROM stdin;
1	5	1	10.49	Build Your Own Sub
2	5	1	8.99	Cheeseburger Sub
3	6	1	10.49	Build Your Own Sub
4	6	1	8.99	Cheeseburger Sub
5	6	1	13.99	Build Your Own Sub
6	6	1	11.99	Dad’’s Special Sub (Italian Sub)
7	6	1	9.49	Dad’’s Special Sub (Italian Sub)
8	7	1	10.49	Build Your Own Sub
9	7	1	8.99	Cheeseburger Sub
10	7	1	13.99	Build Your Own Sub
11	7	1	11.99	Dad’’s Special Sub (Italian Sub)
12	7	1	9.49	Dad’’s Special Sub (Italian Sub)
13	8	1	10.49	Build Your Own Sub
14	8	1	8.99	Cheeseburger Sub
15	8	1	13.99	Build Your Own Sub
16	8	1	11.99	Dad’’s Special Sub (Italian Sub)
17	8	1	9.49	Dad’’s Special Sub (Italian Sub)
\.


--
-- Data for Name: order_status; Type: TABLE DATA; Schema: public; Owner: sejungkim
--

COPY public.order_status (id, status_name, description, color_code, display_order) FROM stdin;
1	Pending	Order has been placed and is awaiting confirmation.	#FFD700	1
2	Confirmed	Order has been confirmed and is being prepared.	#00FF00	2
3	Ready	Order is ready for pickup.	#0000FF	3
4	Completed	Order has been picked up and completed.	#808080	4
5	Cancelled	Order has been cancelled.	#FF0000	5
\.


--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: sejungkim
--

COPY public.orders (id, customer_name, total_amount, order_date, pickup_time, pickup_date, payment_method, taxes_amount, tip_amount, phone_number, order_time, status_id, subtotal_amount) FROM stdin;
1	a a	11.54	9/8/2023	6:00 AM	Mon, Sep 11		0.00	1.05	703-862-5614	1:20:10 AM	1	10.49
2	a a	11.54	9/8/2023	6:00 AM	Mon, Sep 11		0.00	1.05	703-862-5614	1:20:10 AM	1	10.49
3	a a	12.06	9/8/2023	6:00 AM	Mon, Sep 11		0.00	1.57	703-862-5614	1:23:27 AM	1	10.49
4	 	22.4	9/8/2023	6:00 AM	Mon, Sep 11		0.00	2.92		1:23:45 AM	1	19.48
5	 	22.4	9/8/2023	6:00 AM	Mon, Sep 11		0.00	2.92		1:24:26 AM	1	19.48
6	sejung kim	65.94	9/9/2023	6:00 AM	Mon, Sep 11		0.00	10.99	703-862-5614	12:42:01 AM	1	54.95
7	sejung kim	65.94	9/9/2023	6:00 AM	Mon, Sep 11		0.00	10.99	703-862-5614	12:42:03 AM	1	54.95
8	sejung kim	65.94	9/9/2023	6:00 AM	Mon, Sep 11		0.00	10.99	703-862-5614	12:48:41 AM	1	54.95
9	 	0	9/9/2023	7:00 AM	Mon, Sep 11		0.00	0.00		10:19:31 PM	1	0.00
10	 	0	9/13/2023	6:00 AM - 6:15 AM	Thu, Sep 14		0.00	0.00		12:00:06 AM	1	0.00
11	 	0	9/13/2023	6:00 AM - 6:15 AM	Thu, Sep 14		0.00	0.00		12:03:09 AM	1	0.00
12	 	0	9/13/2023	6:00 AM - 6:15 AM	Thu, Sep 14		0.00	0.00		12:19:27 AM	1	0.00
13	 	0	9/13/2023	6:00 AM - 6:15 AM	Thu, Sep 14		0.00	0.00		12:20:43 AM	1	0.00
14	 	0	9/13/2023	6:00 AM - 6:15 AM	Thu, Sep 14		0.00	0.00		12:24:11 AM	1	0.00
15	 	10.99	9/18/2023	6:00 AM - 6:15 AM	Tue, Sep 19		0.00	0.00		11:55:43 PM	1	10.99
16	 	7.99	9/19/2023	6:00 AM - 6:15 AM	Tue, Sep 19		0.00	0.00		12:26:00 AM	1	7.99
17	 	9.99	9/19/2023	6:00 AM - 6:15 AM	Tue, Sep 19		0.00	0.00		12:28:01 AM	1	9.99
18	 	40.94	9/24/2023	6:00 AM - 6:15 AM	Mon, Sep 25		0.00	0.00		5:17:27 AM	1	40.94
19	sage 	40.94	9/24/2023	6:00 AM - 6:15 AM	Mon, Sep 25		0.00	0.00		5:18:10 AM	1	40.94
20	 	2.5	9/24/2023	6:00 AM - 6:15 AM	Mon, Sep 25		0.00	0.00		5:33:41 AM	1	2.50
21	 	2.5	9/24/2023	6:00 AM - 6:15 AM	Mon, Sep 25		0.00	0.00		5:33:45 AM	1	2.50
22	 	2.5	9/24/2023	6:00 AM - 6:15 AM	Mon, Sep 25		0.00	0.00		5:41:55 AM	1	2.50
23	 	2.5	9/24/2023	6:00 AM - 6:15 AM	Mon, Sep 25		0.00	0.00		5:41:55 AM	1	2.50
24	 	2.5	9/24/2023	6:00 AM - 6:15 AM	Mon, Sep 25		0.00	0.00		5:41:55 AM	1	2.50
25	 	2.5	9/24/2023	6:00 AM - 6:15 AM	Mon, Sep 25		0.00	0.00	703-862-5614	5:46:10 AM	1	2.50
26	 	2.5	9/24/2023	6:00 AM - 6:15 AM	Mon, Sep 25		0.00	0.00	703-862-5614	5:46:25 AM	1	2.50
27	 	2.5	9/24/2023	6:00 AM - 6:15 AM	Mon, Sep 25		0.00	0.00	703-862-5614	5:46:56 AM	1	2.50
28	s se	2.5	9/24/2023	6:00 AM - 6:15 AM	Mon, Sep 25		0.00	0.00	703-862-5614	6:32:18 AM	1	2.50
29	s se	2.5	9/24/2023	6:00 AM - 6:15 AM	Mon, Sep 25		0.00	0.00	703-862-5614	6:33:44 AM	1	2.50
30	 	2.5	9/24/2023	6:00 AM - 6:15 AM	Mon, Sep 25		0.00	0.00		6:34:25 AM	1	2.50
31	 	2.5	9/24/2023	6:00 AM - 6:15 AM	Mon, Sep 25		0.00	0.00		6:34:25 AM	1	2.50
32	se sl	2.5	9/24/2023	6:00 AM - 6:15 AM	Mon, Sep 25		0.00	0.00	703-862-5614	6:34:55 AM	1	2.50
33	sej kk	2.5	9/24/2023	6:00 AM - 6:15 AM	Mon, Sep 25		0.00	0.00	703-862-5614	7:12:06 AM	1	2.50
34	alex kim	4.99	9/24/2023	6:00 AM - 6:15 AM	Mon, Sep 25		0.00	0.00	703-862-5614	7:57:17 PM	1	4.99
35	sejung kk	3.49	9/24/2023	6:00 AM - 6:15 AM	Mon, Sep 25		0.00	0.00	838-442-2703	8:27:32 PM	1	3.49
36	sss sss	3.49	9/24/2023	6:00 AM - 6:15 AM	Mon, Sep 25		0.00	0.00	703-862-5614	9:25:25 PM	1	3.49
37	ss ss	2.5	9/24/2023	6:00 AM - 6:15 AM	Mon, Sep 25		0.00	0.00	703-862-5614	9:25:50 PM	1	2.50
38	ss ss	2.5	9/24/2023	6:00 AM - 6:15 AM	Mon, Sep 25		0.00	0.00	703-862-5614	9:26:26 PM	1	2.50
39	ss ss	2.5	9/24/2023	6:00 AM - 6:15 AM	Mon, Sep 25		0.00	0.00	703-862-5614	9:31:04 PM	1	2.50
40	ssss ssss	4.99	9/24/2023	6:00 AM - 6:15 AM	Mon, Sep 25		0.00	0.00	703-862-5614	10:32:47 PM	1	4.99
41	ssss kisksks	5.24	9/25/2023	6:00 AM - 6:15 AM	Mon, Sep 25		0.00	0.25	703-862-5164	9:16:43 PM	1	5.24
\.


--
-- Name: categories_new_id_seq; Type: SEQUENCE SET; Schema: public; Owner: sejungkim
--

SELECT pg_catalog.setval('public.categories_new_id_seq', 14, true);


--
-- Name: customers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: sejungkim
--

SELECT pg_catalog.setval('public.customers_id_seq', 1, false);


--
-- Name: menu_items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: sejungkim
--

SELECT pg_catalog.setval('public.menu_items_id_seq', 76, true);


--
-- Name: menuitems_optiongroups_id_seq; Type: SEQUENCE SET; Schema: public; Owner: sejungkim
--

SELECT pg_catalog.setval('public.menuitems_optiongroups_id_seq', 303, true);


--
-- Name: option_groups_id_seq; Type: SEQUENCE SET; Schema: public; Owner: sejungkim
--

SELECT pg_catalog.setval('public.option_groups_id_seq', 44, true);


--
-- Name: options_id_seq; Type: SEQUENCE SET; Schema: public; Owner: sejungkim
--

SELECT pg_catalog.setval('public.options_id_seq', 125, true);


--
-- Name: order_menu_items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: sejungkim
--

SELECT pg_catalog.setval('public.order_menu_items_id_seq', 44, true);


--
-- Name: order_status_id_seq; Type: SEQUENCE SET; Schema: public; Owner: sejungkim
--

SELECT pg_catalog.setval('public.order_status_id_seq', 5, true);


--
-- Name: orders_id_seq; Type: SEQUENCE SET; Schema: public; Owner: sejungkim
--

SELECT pg_catalog.setval('public.orders_id_seq', 41, true);


--
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: sejungkim
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (category_id);


--
-- Name: customers customers_pkey; Type: CONSTRAINT; Schema: public; Owner: sejungkim
--

ALTER TABLE ONLY public.customers
    ADD CONSTRAINT customers_pkey PRIMARY KEY (id);


--
-- Name: menu_items menu_items_pkey; Type: CONSTRAINT; Schema: public; Owner: sejungkim
--

ALTER TABLE ONLY public.menu_items
    ADD CONSTRAINT menu_items_pkey PRIMARY KEY (id);


--
-- Name: menuitems_optiongroups menuitems_optiongroups_pkey; Type: CONSTRAINT; Schema: public; Owner: sejungkim
--

ALTER TABLE ONLY public.menuitems_optiongroups
    ADD CONSTRAINT menuitems_optiongroups_pkey PRIMARY KEY (id);


--
-- Name: option_groups option_groups_pkey; Type: CONSTRAINT; Schema: public; Owner: sejungkim
--

ALTER TABLE ONLY public.option_groups
    ADD CONSTRAINT option_groups_pkey PRIMARY KEY (id);


--
-- Name: options options_pkey; Type: CONSTRAINT; Schema: public; Owner: sejungkim
--

ALTER TABLE ONLY public.options
    ADD CONSTRAINT options_pkey PRIMARY KEY (id);


--
-- Name: order_items order_menu_items_pkey; Type: CONSTRAINT; Schema: public; Owner: sejungkim
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_menu_items_pkey PRIMARY KEY (id);


--
-- Name: order_status order_status_pkey; Type: CONSTRAINT; Schema: public; Owner: sejungkim
--

ALTER TABLE ONLY public.order_status
    ADD CONSTRAINT order_status_pkey PRIMARY KEY (id);


--
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: sejungkim
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);


--
-- Name: menu_items fk_category; Type: FK CONSTRAINT; Schema: public; Owner: sejungkim
--

ALTER TABLE ONLY public.menu_items
    ADD CONSTRAINT fk_category FOREIGN KEY (category_id) REFERENCES public.categories(category_id);


--
-- Name: options fk_option_group; Type: FK CONSTRAINT; Schema: public; Owner: sejungkim
--

ALTER TABLE ONLY public.options
    ADD CONSTRAINT fk_option_group FOREIGN KEY (option_group_id) REFERENCES public.option_groups(id);


--
-- Name: order_items fk_order_items_order_id; Type: FK CONSTRAINT; Schema: public; Owner: sejungkim
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT fk_order_items_order_id FOREIGN KEY (order_id) REFERENCES public.orders(id);


--
-- Name: menuitems_optiongroups menuitems_optiongroups_menu_item_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: sejungkim
--

ALTER TABLE ONLY public.menuitems_optiongroups
    ADD CONSTRAINT menuitems_optiongroups_menu_item_id_fkey FOREIGN KEY (menu_item_id) REFERENCES public.menu_items(id);


--
-- Name: menuitems_optiongroups menuitems_optiongroups_option_group_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: sejungkim
--

ALTER TABLE ONLY public.menuitems_optiongroups
    ADD CONSTRAINT menuitems_optiongroups_option_group_id_fkey FOREIGN KEY (option_group_id) REFERENCES public.option_groups(id);


--
-- Name: options options_option_group_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: sejungkim
--

ALTER TABLE ONLY public.options
    ADD CONSTRAINT options_option_group_id_fkey FOREIGN KEY (option_group_id) REFERENCES public.option_groups(id);


--
-- Name: options options_option_groups_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: sejungkim
--

ALTER TABLE ONLY public.options
    ADD CONSTRAINT options_option_groups_id_fkey FOREIGN KEY (option_group_id) REFERENCES public.option_groups(id);


--
-- Name: order_items order_menu_items_order_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: sejungkim
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_menu_items_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(id);


--
-- PostgreSQL database dump complete
--

