#script='bible.pl'
script='duranno.pl'
dir='../data/'

for i in {1..66}
do
	for j in {1..150}
	do
		#filename="K2.${i}.${j}"
		#perl $script $i $j > $filename
		filename="${dir}J4.${i}.${j}"
		perl nocr.pl $i $j > $filename
		#filename="K3.${i}.${j}"
		#perl godpia.pl $i $j > $filename
		if [ ! -s $filename ]
		then
			rm $filename
			break
		else
			echo "$i $j"
			#filename="K.${i}.${j}"
			#perl bible.pl GAE $i $j > $filename
			#filename="J.${i}.${j}"
			#perl bible.pl KSNKI $i $j > $filename
		fi
	done
done
