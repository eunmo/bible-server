use LWP::Simple;
use feature 'unicode_strings';
use utf8;
use Encode;
use Mojo::DOM;
use Mojo::Collection;
use DateTime;
binmode(STDOUT, ":utf8");

my $vl = $ARGV[0];
my $cn = $ARGV[1];

my @books = (
"", "Ge", "Ex", "Le", "Nu", "De", "Jos", "Jud", "Ru", "1Sa", "2Sa", "1Ki", "2Ki", "1Ch", "2Ch", "Ezr", "Ne", "Es", "Job", "Ps", "Pr", "Ec", "So", "Isa", "Jer", "La", "Eze", "Da", "Ho", "Joe", "Am", "Ob", "Jon", "Mic", "Na", "Hab", "Zep", "Hag", "Zec", "Mal", "Mt", "Mr", "Lu", "Joh", "Ac", "Ro", "1Co", "2Co", "Ga", "Eph", "Php", "Col", "1Th", "2Th", "1Ti", "2Ti", "Tit", "Phm", "Heb", "Jas", "1Pe", "2Pe", "1Jo", "2Jo", "3Jo", "Jude", "Re"
);

my $book = $books[$vl];

my $url = "http://nocr.net/bexpo/spanish/spanvi/index.php/$book/$cn/";
my $html = get("$url");
my $dom = Mojo::DOM->new($html);

my $count = 1;
my $index = 0;

my $tds = $dom->find('td[valign="middle"]');

exit if $tds->size == 0;

for my $span ($tds->[0]->descendant_nodes->grep(sub { $_->type eq 'text' })->each) {

	$index++;
	next if $index % 3 != 0;

	my $text = $span;

	$text =~ s/^\s+//g;
	$text =~ s/\s+$//g;
	print ",\n" if $count > 1;
	print "[" if $count == 1;
	print "\"$text\"";
	$count++;
}

print "]" if $count > 1;
