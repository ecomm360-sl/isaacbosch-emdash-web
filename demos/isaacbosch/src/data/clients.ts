/**
 * Clients Isaac Bosch has worked with.
 *
 * REVISAR Y CONFIRMAR ANTES DE PUBLICAR.
 * La mayoría de sectores y tipos de proyecto son un primer pase basado en el
 * conocimiento público de cada marca. Valida y corrige los que sean incorrectos.
 *
 * Logos en /public/clientes/ (filenames en kebab-case).
 */

export type ClientSector =
	| "alimentacion-bebidas"
	| "retail-moda"
	| "calzado"
	| "industrial-maquinaria"
	| "mueble-hogar"
	| "salud-belleza"
	| "servicios-financieros"
	| "tecnologia-it"
	| "ocio-juguetes"
	| "educacion"
	| "automocion"
	| "otros";

export const CLIENT_SECTORS: Record<ClientSector, string> = {
	"alimentacion-bebidas": "Alimentación y bebidas",
	"retail-moda": "Retail y moda",
	"calzado": "Calzado",
	"industrial-maquinaria": "Industrial y maquinaria",
	"mueble-hogar": "Mueble y hogar",
	"salud-belleza": "Salud y belleza",
	"servicios-financieros": "Servicios financieros",
	"tecnologia-it": "Tecnología e IT",
	"ocio-juguetes": "Ocio y juguetes",
	"educacion": "Educación",
	"automocion": "Automoción",
	"otros": "Otros",
};

export interface Client {
	slug: string;
	name: string;
	logo: string;
	sector: ClientSector;
	projectType: string;
	url?: string;
	featured?: boolean;
}

// Default project types used as templates
const DEFAULT_ECOMMERCE = "eCommerce + integración";
const DEFAULT_B2B_ERP = "eCommerce B2B + integración ERP";
const DEFAULT_PLATFORM = "Plataforma digital";

export const clients: Client[] = [
	{ slug: "adnid", name: "Adnid", logo: "/clientes/adnid.jpeg", sector: "otros", projectType: DEFAULT_ECOMMERCE , featured: true },
	{ slug: "alfasoni", name: "Alfasoni", logo: "/clientes/alfasoni.jpeg", sector: "otros", projectType: DEFAULT_ECOMMERCE },
	{ slug: "applus", name: "Applus+", logo: "/clientes/applus.png", sector: "tecnologia-it", projectType: DEFAULT_PLATFORM , featured: true },
	{ slug: "ara", name: "Ara", logo: "/clientes/ara.png", sector: "calzado", projectType: DEFAULT_ECOMMERCE },
	{ slug: "atlantis", name: "Atlantis", logo: "/clientes/atlantis.png", sector: "otros", projectType: DEFAULT_ECOMMERCE },
	{ slug: "auvisa", name: "Auvisa", logo: "/clientes/auvisa.png", sector: "automocion", projectType: DEFAULT_PLATFORM },
	{ slug: "beatriz", name: "Beatriz", logo: "/clientes/beatriz.png", sector: "otros", projectType: DEFAULT_ECOMMERCE },
	{ slug: "beter", name: "Beter", logo: "/clientes/beter.png", sector: "salud-belleza", projectType: DEFAULT_ECOMMERCE , featured: true },
	{ slug: "bikila", name: "Bikila", logo: "/clientes/bikila.png", sector: "calzado", projectType: DEFAULT_ECOMMERCE },
	{ slug: "brinox", name: "Brinox", logo: "/clientes/brinox.jpeg", sector: "otros", projectType: DEFAULT_ECOMMERCE },
	{ slug: "brownie", name: "Brownie", logo: "/clientes/brownie.png", sector: "retail-moda", projectType: DEFAULT_ECOMMERCE , featured: true },
	{ slug: "cacaolat", name: "Cacaolat", logo: "/clientes/cacaolat.png", sector: "alimentacion-bebidas", projectType: DEFAULT_B2B_ERP },
	{ slug: "caixa", name: "CaixaBank", logo: "/clientes/caixa.png", sector: "servicios-financieros", projectType: DEFAULT_PLATFORM , featured: true },
	{ slug: "carcasas", name: "Carcasas", logo: "/clientes/carcasas.png", sector: "retail-moda", projectType: DEFAULT_ECOMMERCE , featured: true },
	{ slug: "casademunt", name: "Casademunt", logo: "/clientes/casademunt.png", sector: "mueble-hogar", projectType: DEFAULT_B2B_ERP },
	{ slug: "cetelem", name: "Cetelem", logo: "/clientes/cetelem.png", sector: "servicios-financieros", projectType: DEFAULT_PLATFORM },
	{ slug: "cintacor", name: "Cintacor", logo: "/clientes/cintacor.png", sector: "industrial-maquinaria", projectType: DEFAULT_B2B_ERP },
	{ slug: "cirsa", name: "Cirsa", logo: "/clientes/cirsa.jpeg", sector: "ocio-juguetes", projectType: DEFAULT_PLATFORM , featured: true },
	{ slug: "cofidis", name: "Cofidis", logo: "/clientes/cofidis.png", sector: "servicios-financieros", projectType: DEFAULT_PLATFORM },
	{ slug: "compass", name: "Compass", logo: "/clientes/compass.png", sector: "otros", projectType: DEFAULT_ECOMMERCE },
	{ slug: "condalab", name: "Conda Lab", logo: "/clientes/condalab.png", sector: "salud-belleza", projectType: DEFAULT_B2B_ERP },
	{ slug: "condor", name: "Condor", logo: "/clientes/condor.png", sector: "retail-moda", projectType: DEFAULT_ECOMMERCE , featured: true },
	{ slug: "coremosa", name: "Coremosa", logo: "/clientes/coremosa.png", sector: "otros", projectType: DEFAULT_ECOMMERCE },
	{ slug: "cottet", name: "Cottet", logo: "/clientes/cottet.png", sector: "retail-moda", projectType: DEFAULT_ECOMMERCE },
	{ slug: "cuadro", name: "Cuadro", logo: "/clientes/cuadro.jpeg", sector: "otros", projectType: DEFAULT_ECOMMERCE },
	{ slug: "damm", name: "Damm", logo: "/clientes/damm.png", sector: "alimentacion-bebidas", projectType: DEFAULT_B2B_ERP , featured: true },
	{ slug: "dareels", name: "Dareels", logo: "/clientes/dareels.png", sector: "otros", projectType: DEFAULT_ECOMMERCE },
	{ slug: "double", name: "Double", logo: "/clientes/double.png", sector: "otros", projectType: DEFAULT_ECOMMERCE },
	{ slug: "edeusto", name: "Deusto", logo: "/clientes/edeusto.png", sector: "educacion", projectType: DEFAULT_PLATFORM },
	{ slug: "emuca", name: "Emuca", logo: "/clientes/emuca.png", sector: "industrial-maquinaria", projectType: DEFAULT_B2B_ERP },
	{ slug: "erik", name: "Erik", logo: "/clientes/erik.jpeg", sector: "retail-moda", projectType: DEFAULT_ECOMMERCE },
	{ slug: "esinsa", name: "Esinsa", logo: "/clientes/esinsa.png", sector: "industrial-maquinaria", projectType: DEFAULT_B2B_ERP },
	{ slug: "favorita", name: "La Favorita", logo: "/clientes/favorita.png", sector: "alimentacion-bebidas", projectType: DEFAULT_ECOMMERCE },
	{ slug: "fedefarma", name: "Fedefarma", logo: "/clientes/fedefarma.png", sector: "salud-belleza", projectType: DEFAULT_B2B_ERP },
	{ slug: "ferrolan", name: "Ferrolan", logo: "/clientes/ferrolan.jpeg", sector: "industrial-maquinaria", projectType: DEFAULT_B2B_ERP , featured: true },
	{ slug: "finocam", name: "Finocam", logo: "/clientes/finocam.png", sector: "retail-moda", projectType: DEFAULT_ECOMMERCE },
	{ slug: "fixe", name: "Fixe", logo: "/clientes/fixe.png", sector: "otros", projectType: DEFAULT_ECOMMERCE , featured: true },
	{ slug: "flores", name: "Flores", logo: "/clientes/flores.png", sector: "otros", projectType: DEFAULT_ECOMMERCE },
	{ slug: "fotoruano", name: "Foto Ruano", logo: "/clientes/fotoruano.png", sector: "retail-moda", projectType: DEFAULT_ECOMMERCE , featured: true },
	{ slug: "grau", name: "Grau", logo: "/clientes/grau.png", sector: "otros", projectType: DEFAULT_ECOMMERCE },
	{ slug: "greenice", name: "Greenice", logo: "/clientes/greenice.jpeg", sector: "otros", projectType: DEFAULT_ECOMMERCE , featured: true },
	{ slug: "henrry", name: "Henry", logo: "/clientes/henrry.png", sector: "calzado", projectType: DEFAULT_ECOMMERCE },
	{ slug: "hidro", name: "Hidro", logo: "/clientes/hidro.png", sector: "industrial-maquinaria", projectType: DEFAULT_B2B_ERP },
	{ slug: "hoffman", name: "Hoffmann", logo: "/clientes/hoffman.png", sector: "industrial-maquinaria", projectType: DEFAULT_B2B_ERP },
	{ slug: "institutobcn", name: "Instituto BCN", logo: "/clientes/institutobcn.png", sector: "educacion", projectType: DEFAULT_PLATFORM },
	{ slug: "intersport", name: "Intersport", logo: "/clientes/intersport.png", sector: "retail-moda", projectType: DEFAULT_ECOMMERCE },
	{ slug: "kelmi", name: "Kelmi", logo: "/clientes/kelmi.png", sector: "salud-belleza", projectType: DEFAULT_ECOMMERCE },
	{ slug: "kern", name: "Kern Pharma", logo: "/clientes/kern.png", sector: "salud-belleza", projectType: DEFAULT_B2B_ERP , featured: true },
	{ slug: "kibuc", name: "Kibuc", logo: "/clientes/kibuc.png", sector: "mueble-hogar", projectType: DEFAULT_ECOMMERCE },
	{ slug: "kimaldi", name: "Kimaldi", logo: "/clientes/kimaldi.png", sector: "tecnologia-it", projectType: DEFAULT_B2B_ERP },
	{ slug: "kinuma", name: "Kinuma", logo: "/clientes/kinuma.png", sector: "ocio-juguetes", projectType: DEFAULT_ECOMMERCE },
	{ slug: "madden", name: "Steve Madden", logo: "/clientes/madden.png", sector: "calzado", projectType: DEFAULT_ECOMMERCE },
	{ slug: "maquina", name: "Maquina", logo: "/clientes/maquina.png", sector: "industrial-maquinaria", projectType: DEFAULT_B2B_ERP },
	{ slug: "mar3sma", name: "Mar3sma", logo: "/clientes/mar3sma.png", sector: "otros", projectType: DEFAULT_ECOMMERCE },
	{ slug: "marjoman", name: "Marjoman", logo: "/clientes/marjoman.png", sector: "industrial-maquinaria", projectType: DEFAULT_B2B_ERP },
	{ slug: "masque", name: "Masque", logo: "/clientes/masque.png", sector: "otros", projectType: DEFAULT_ECOMMERCE },
	{ slug: "matias-buenos-dias", name: "Matias Buenos Dias", logo: "/clientes/matias-buenos-dias.jpeg", sector: "alimentacion-bebidas", projectType: DEFAULT_ECOMMERCE },
	{ slug: "mci", name: "MCI", logo: "/clientes/mci.png", sector: "otros", projectType: DEFAULT_ECOMMERCE },
	{ slug: "miriamquevedo", name: "Miriam Quevedo", logo: "/clientes/miriamquevedo.png", sector: "salud-belleza", projectType: DEFAULT_ECOMMERCE , featured: true },
	{ slug: "mister-minit", name: "Mister Minit", logo: "/clientes/mister-minit.png", sector: "calzado", projectType: DEFAULT_PLATFORM },
	{ slug: "moddo", name: "Moddo", logo: "/clientes/moddo.jpeg", sector: "retail-moda", projectType: DEFAULT_ECOMMERCE },
	{ slug: "monster", name: "Monster", logo: "/clientes/monster.png", sector: "alimentacion-bebidas", projectType: DEFAULT_ECOMMERCE },
	{ slug: "nkn", name: "NKN", logo: "/clientes/nkn.png", sector: "otros", projectType: DEFAULT_ECOMMERCE },
	{ slug: "ofiprix", name: "Ofiprix", logo: "/clientes/ofiprix.jpeg", sector: "mueble-hogar", projectType: DEFAULT_ECOMMERCE , featured: true },
	{ slug: "ortocanis", name: "Ortocanis", logo: "/clientes/ortocanis.png", sector: "salud-belleza", projectType: DEFAULT_ECOMMERCE },
	{ slug: "pdpaola", name: "PD Paola", logo: "/clientes/pdpaola.png", sector: "retail-moda", projectType: DEFAULT_ECOMMERCE },
	{ slug: "primeras", name: "Primeras", logo: "/clientes/primeras.png", sector: "calzado", projectType: DEFAULT_ECOMMERCE },
	{ slug: "proclinic", name: "Proclinic", logo: "/clientes/proclinic.png", sector: "salud-belleza", projectType: DEFAULT_B2B_ERP },
	{ slug: "promise", name: "Promise", logo: "/clientes/promise.png", sector: "retail-moda", projectType: DEFAULT_ECOMMERCE },
	{ slug: "puntoqpack", name: "Punto Q Pack", logo: "/clientes/puntoqpack.jpeg", sector: "industrial-maquinaria", projectType: DEFAULT_B2B_ERP },
	{ slug: "qfplus", name: "QF Plus", logo: "/clientes/qfplus.png", sector: "otros", projectType: DEFAULT_ECOMMERCE },
	{ slug: "querol", name: "Querol", logo: "/clientes/querol.png", sector: "calzado", projectType: DEFAULT_ECOMMERCE },
	{ slug: "racc", name: "RACC", logo: "/clientes/racc.png", sector: "automocion", projectType: DEFAULT_PLATFORM },
	{ slug: "radarcan", name: "Radarcan", logo: "/clientes/radarcan.png", sector: "salud-belleza", projectType: DEFAULT_ECOMMERCE },
	{ slug: "ramon", name: "Ramon", logo: "/clientes/ramon.png", sector: "otros", projectType: DEFAULT_ECOMMERCE },
	{ slug: "robotix", name: "Robotix", logo: "/clientes/robotix.png", sector: "educacion", projectType: DEFAULT_PLATFORM },
	{ slug: "sbs", name: "SBS", logo: "/clientes/sbs.png", sector: "otros", projectType: DEFAULT_ECOMMERCE },
	{ slug: "scalextric", name: "Scalextric", logo: "/clientes/scalextric.png", sector: "ocio-juguetes", projectType: DEFAULT_ECOMMERCE },
	{ slug: "shana", name: "Shana", logo: "/clientes/shana.png", sector: "retail-moda", projectType: DEFAULT_ECOMMERCE },
	{ slug: "siscocan", name: "Siscocan", logo: "/clientes/siscocan.png", sector: "otros", projectType: DEFAULT_ECOMMERCE },
	{ slug: "solplay", name: "Solplay", logo: "/clientes/solplay.svg", sector: "ocio-juguetes", projectType: DEFAULT_ECOMMERCE },
	{ slug: "soluzion", name: "Soluzion", logo: "/clientes/soluzion.png", sector: "tecnologia-it", projectType: DEFAULT_PLATFORM },
	{ slug: "suara", name: "Suara", logo: "/clientes/suara.png", sector: "otros", projectType: DEFAULT_PLATFORM },
	{ slug: "systemaction", name: "Systemaction", logo: "/clientes/systemaction.png", sector: "tecnologia-it", projectType: DEFAULT_PLATFORM },
	{ slug: "teresa", name: "Teresa", logo: "/clientes/teresa.png", sector: "otros", projectType: DEFAULT_ECOMMERCE },
	{ slug: "tntools", name: "TN Tools", logo: "/clientes/tntools.jpeg", sector: "industrial-maquinaria", projectType: DEFAULT_B2B_ERP },
	{ slug: "tokio", name: "Tokio School", logo: "/clientes/tokio.jpeg", sector: "educacion", projectType: DEFAULT_PLATFORM },
	{ slug: "tramuntana", name: "Tramuntana", logo: "/clientes/tramuntana.png", sector: "otros", projectType: DEFAULT_ECOMMERCE },
	{ slug: "tventas", name: "TVentas", logo: "/clientes/tventas.jpeg", sector: "otros", projectType: DEFAULT_ECOMMERCE },
	{ slug: "unidesa", name: "Unidesa", logo: "/clientes/unidesa.png", sector: "ocio-juguetes", projectType: DEFAULT_B2B_ERP },
	{ slug: "vicent", name: "Vicent", logo: "/clientes/vicent.png", sector: "otros", projectType: DEFAULT_ECOMMERCE },
	{ slug: "vichy-catalan", name: "Vichy Catalan", logo: "/clientes/vichy-catalan.png", sector: "alimentacion-bebidas", projectType: DEFAULT_B2B_ERP , featured: true },
	{ slug: "wonders", name: "Wonders", logo: "/clientes/wonders.png", sector: "calzado", projectType: DEFAULT_ECOMMERCE },

	// Nueva tanda — REVISAR sectores y tipos de proyecto
	{ slug: "amazing", name: "Amazing", logo: "/clientes/amazing_logo.jpg", sector: "otros", projectType: DEFAULT_ECOMMERCE },
	{ slug: "andreanimhs", name: "Andrean Imhs", logo: "/clientes/andreanimhs_logo.jpg", sector: "retail-moda", projectType: DEFAULT_ECOMMERCE , featured: true },
	{ slug: "beatrizfurest", name: "Beatriz Furest", logo: "/clientes/beatrizfurest_logo.png", sector: "retail-moda", projectType: DEFAULT_ECOMMERCE },
	{ slug: "bella-aurora", name: "Bella Aurora", logo: "/clientes/bella_aurora_logo.png", sector: "salud-belleza", projectType: DEFAULT_B2B_ERP },
	{ slug: "calmahouse", name: "Calmahouse", logo: "/clientes/calmahouse.png", sector: "mueble-hogar", projectType: DEFAULT_ECOMMERCE },
	{ slug: "cuadrostock", name: "Cuadrostock", logo: "/clientes/cuadrostock_logo.jpg", sector: "mueble-hogar", projectType: DEFAULT_ECOMMERCE },
	{ slug: "decoforhome", name: "Deco For Home", logo: "/clientes/decoforhome_logo.png", sector: "mueble-hogar", projectType: DEFAULT_ECOMMERCE },
	{ slug: "easybuywine", name: "Easy Buy Wine", logo: "/clientes/easybuywine_logo.png", sector: "alimentacion-bebidas", projectType: DEFAULT_ECOMMERCE },
	{ slug: "electrohogarvillamil", name: "Electrohogar Villamil", logo: "/clientes/electrohogarvillamil_logo.png", sector: "mueble-hogar", projectType: DEFAULT_ECOMMERCE },
	{ slug: "elmundodelasalfombras", name: "El Mundo de las Alfombras", logo: "/clientes/elmundodelasalfombras_logo.png", sector: "mueble-hogar", projectType: DEFAULT_ECOMMERCE },
	{ slug: "elmundodelastelas", name: "El Mundo de las Telas", logo: "/clientes/elmundodelastelas_logo.jpg", sector: "mueble-hogar", projectType: DEFAULT_ECOMMERCE },
	{ slug: "fontmeco", name: "Fontmeco", logo: "/clientes/fontmeco_logo.jpg", sector: "industrial-maquinaria", projectType: DEFAULT_B2B_ERP },
	{ slug: "gruporp", name: "Grupo RP", logo: "/clientes/gruporp_logo.jpg", sector: "otros", projectType: DEFAULT_B2B_ERP },
	{ slug: "habitium", name: "Habitium", logo: "/clientes/habitium_logo.jpg", sector: "mueble-hogar", projectType: DEFAULT_B2B_ERP },
	{ slug: "harley-davidson", name: "Harley-Davidson", logo: "/clientes/harley_davidson_logo.jpg", sector: "automocion", projectType: DEFAULT_ECOMMERCE },
	{ slug: "ladrogueria", name: "La Drogueria", logo: "/clientes/ladrogueria_logo.png", sector: "salud-belleza", projectType: DEFAULT_ECOMMERCE },
	{ slug: "maderasbarber", name: "Maderas Barber", logo: "/clientes/maderasbarber_logo.jpg", sector: "industrial-maquinaria", projectType: DEFAULT_B2B_ERP },
	{ slug: "maquinaelectric", name: "Maquina Electric", logo: "/clientes/maquinaelectric_logo.png", sector: "industrial-maquinaria", projectType: DEFAULT_B2B_ERP },
	{ slug: "masquevideo", name: "Masque Video", logo: "/clientes/masquevideo_logo.jpg", sector: "tecnologia-it", projectType: DEFAULT_ECOMMERCE },
	{ slug: "n3xtwave", name: "N3xtwave", logo: "/clientes/n3xtwave_logo.jpg", sector: "tecnologia-it", projectType: DEFAULT_PLATFORM },
	{ slug: "reig-beaux-arts", name: "Reig Beaux Arts", logo: "/clientes/reig_beaux_arts_logo.png", sector: "otros", projectType: DEFAULT_ECOMMERCE },
	{ slug: "rocaroya", name: "Roca Roya", logo: "/clientes/rocaroya_logo.jpg", sector: "retail-moda", projectType: DEFAULT_ECOMMERCE },
	{ slug: "vicensvives", name: "Vicens Vives", logo: "/clientes/vicensvives_logo.jpg", sector: "educacion", projectType: DEFAULT_PLATFORM , featured: true },
	{ slug: "zapatosmarina", name: "Zapatos Marina", logo: "/clientes/zapatosmarina_logo.jpg", sector: "calzado", projectType: DEFAULT_ECOMMERCE },
];

export function getClientsBySector(sector: ClientSector): Client[] {
	return clients.filter((c) => c.sector === sector);
}

export function getFeaturedClients(): Client[] {
	return clients.filter((c) => c.featured);
}

export function getSectorsWithCounts(): Array<{ sector: ClientSector; label: string; count: number }> {
	const counts = new Map<ClientSector, number>();
	for (const client of clients) {
		counts.set(client.sector, (counts.get(client.sector) ?? 0) + 1);
	}
	return (Object.keys(CLIENT_SECTORS) as ClientSector[])
		.map((sector) => ({
			sector,
			label: CLIENT_SECTORS[sector],
			count: counts.get(sector) ?? 0,
		}))
		.filter((s) => s.count > 0);
}
