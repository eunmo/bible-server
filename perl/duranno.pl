use LWP::Simple;
use feature 'unicode_strings';
use utf8;
use Encode;
use Mojo::DOM;
use Mojo::Collection;
use DateTime;
binmode(STDOUT, ":utf8");

my $vl = $ARGV[0];
my $ct = $ARGV[1];

my $url = "http://www.duranno.com/bdictionary/result_woori.asp?s=r&kd=104&vl=$vl&ct=$ct";
my $html = LWP::UserAgent->new->get($url)->content;
my $dom = Mojo::DOM->new($html);

my $count = 1;

for my $tr ($dom->find('table[width="98%"] tr')->each) {

	next if $tr->find('td')->[0]->all_text == "";

	my $text = $tr->find('td')->[1]->all_text;
  $text = decode('cp949', $text);

	$text =~ s/\s+$//g;
	$text =~ s/[“”"]/\\\"/g;
	$text =~ s/[‘’]/\'/g;
	print ",\n" if $count > 1;
	print "[" if $count == 1;
	print "\"$text\"";
	$count++;
}

print "]" if $count > 1;
