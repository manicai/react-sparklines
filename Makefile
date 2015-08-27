
all:
	tsc --jsx react --removeComments -m amd src/sparkbars.tsx --outDir build
	tsc --jsx react --removeComments -m amd src/sparktimeline.tsx --outDir build

clean:
	$(RM) -r build